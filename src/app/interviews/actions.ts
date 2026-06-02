"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function createInterview(formData: FormData) {
  const type = formData.get("type") as string;
  const scheduledAt = formData.get("scheduledAt") as string;
  const notes = formData.get("notes") as string;
  const applicationId = formData.get("applicationId") as string;

  await prisma.interview.create({
    data: {
      type,
      scheduledAt: new Date(scheduledAt),
      notes,
      applicationId,
    },
  });

  redirect("/interviews");
}

export async function deleteInterview(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.interview.delete({
    where: {
      id,
    },
  });

  redirect("/interviews");
}

export async function updateInterview(formData: FormData) {
  const id = formData.get("id") as string;
  const type = formData.get("type") as string;
  const scheduledAt = formData.get("scheduledAt") as string;
  const notes = formData.get("notes") as string;
  const applicationId = formData.get("applicationId") as string;

  await prisma.interview.update({
    where: {
      id,
    },
    data: {
      type,
      scheduledAt: new Date(scheduledAt),
      notes,
      applicationId,
    },
  });

  redirect("/interviews");
}