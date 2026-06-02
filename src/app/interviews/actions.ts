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