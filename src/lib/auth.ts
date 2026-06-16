import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  let prismaUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!prismaUser) {
    prismaUser = await prisma.user.create({
      data: {
        email: user.email,
      },
    });
  }

  return prismaUser;
}