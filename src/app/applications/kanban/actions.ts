"use server";

import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateApplicationStatus(
  applicationId: string,
  status: string
) {
  const user = await requireCurrentUser();

  await prisma.jobApplication.updateMany({
    where: {
      id: applicationId,
      userId: user.id,
    },
    data: {
      status,
    },
  });

  revalidatePath("/applications");
  revalidatePath("/applications/kanban");
  revalidatePath("/dashboard");
}