"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hasMinLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);

  if (
    !hasMinLength ||
    !hasLowercase ||
    !hasUppercase ||
    !hasNumber ||
    !hasSpecialCharacter
  ) {
    redirect("/signup?error=weak_password");
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://job-tracker-pro-one.vercel.app";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    console.error("SIGNUP ERROR:", error);

    redirect(
      `/signup?error=${encodeURIComponent(error.message)}`
    );
  }

  redirect("/login?success=account_created");
}