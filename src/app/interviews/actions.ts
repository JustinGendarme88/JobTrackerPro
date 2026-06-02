"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { requireCurrentUser } from "@/lib/auth";

export async function createInterview(formData: FormData) {
  const type = formData.get("type") as string;
  const scheduledAt = formData.get("scheduledAt") as string;
  const notes = formData.get("notes") as string;
  const applicationId = formData.get("applicationId") as string;

  const user = await requireCurrentUser();

  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      userId: user.id,
    },
  });

  if (!application) {
    redirect("/interviews");
  }

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
  const user = await requireCurrentUser();

  await prisma.interview.deleteMany({
    where: {
      id,
      application: {
        userId: user.id,
      },
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

  const user = await requireCurrentUser();

  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      userId: user.id,
    },
  });

  if (!application) {
    redirect("/interviews");
  }

  await prisma.interview.updateMany({
    where: {
      id,
      application: {
        userId: user.id,
      },
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