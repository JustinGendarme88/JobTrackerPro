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

  const prismaUser = await prisma.user.upsert({
    where: {
      email: user.email,
    },
    update: {},
    create: {
      email: user.email,
    },
  });

  return prismaUser;
}