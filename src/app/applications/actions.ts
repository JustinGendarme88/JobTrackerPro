"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { requireCurrentUser } from "@/lib/auth";

export async function createApplication(formData: FormData) {
  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as string;

  const user = await requireCurrentUser();

  await prisma.jobApplication.create({
    data: {
      company,
      position,
      location,
      status,
      userId: user.id,
    },
  });

  redirect("/applications");
}

export async function deleteApplication(formData: FormData) {
  const id = formData.get("id") as string;
  const user = await requireCurrentUser();

  await prisma.jobApplication.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  });

  redirect("/applications");
}

export async function updateApplication(formData: FormData) {
  const id = formData.get("id") as string;
  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as string;

  const user = await requireCurrentUser();

  await prisma.jobApplication.updateMany({
    where: {
      id,
      userId: user.id,
    },
    data: {
      company,
      position,
      location,
      status,
    },
  });

  redirect("/applications");
}