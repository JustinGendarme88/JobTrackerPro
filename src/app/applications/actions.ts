"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function createApplication(formData: FormData) {
  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as string;

  const user = await prisma.user.findFirst();

  if (!user) {
    throw new Error("No user found");
  }

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

  await prisma.jobApplication.delete({
    where: {
      id,
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

  await prisma.jobApplication.update({
    where: {
      id,
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