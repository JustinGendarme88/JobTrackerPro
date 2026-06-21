"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";

export async function createApplicationStage(formData: FormData) {
  const user = await requireCurrentUser();

  const applicationId = formData.get("applicationId") as string;
  const stageType = formData.get("stageType") as string;
  const notes = formData.get("notes") as string;

  if (!applicationId || !stageType) {
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

  await prisma.applicationStage.create({
    data: {
      applicationId,
      stageType,
      notes,
    },
  });

  revalidatePath(`/applications/${applicationId}/edit`);
  revalidatePath("/applications");
}