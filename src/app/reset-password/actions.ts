"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateResetPassword(formData: FormData) {
  const supabase = await createClient();

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
    redirect("/reset-password?error=weak_password");
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.error(error);

    redirect(
      `/reset-password?error=${encodeURIComponent(error.message)}`
    );
  }

  redirect("/login?success=password_reset");
}