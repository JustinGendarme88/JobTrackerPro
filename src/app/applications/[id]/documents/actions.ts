"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function uploadApplicationDocument(formData: FormData) {
  const user = await requireCurrentUser();
  const supabase = await createClient();

  const applicationId = formData.get("applicationId") as string;
  const type = formData.get("type") as string;
  const file = formData.get("file") as File;

  if (!applicationId || !type || !file || file.size === 0) {
    return;
  }

  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      userId: user.id,
    },
  });

  if (!application) {
    return;
  }

  const filePath = `${user.id}/${applicationId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("application-documents")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  await prisma.applicationDocument.create({
    data: {
      type,
      fileName: file.name,
      filePath,
      fileSize: file.size,
      mimeType: file.type,
      applicationId,
    },
  });

  revalidatePath(`/applications/${applicationId}/edit`);
  revalidatePath("/applications");
}

export async function deleteApplicationDocument(formData: FormData) {
  const user = await requireCurrentUser();
  const supabase = await createClient();

  const documentId = formData.get("documentId") as string;

  if (!documentId) {
    return;
  }

  const document = await prisma.applicationDocument.findFirst({
    where: {
      id: documentId,
      application: {
        userId: user.id,
      },
    },
  });

  if (!document) {
    return;
  }

  const { error } = await supabase.storage
    .from("application-documents")
    .remove([document.filePath]);

  if (error) {
    throw new Error(error.message);
  }

  await prisma.applicationDocument.delete({
    where: {
      id: document.id,
    },
  });

  revalidatePath(`/applications/${document.applicationId}/edit`);
  revalidatePath("/applications");
}