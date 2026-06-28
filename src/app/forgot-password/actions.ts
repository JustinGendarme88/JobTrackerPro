"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function sendPasswordResetEmail(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  if (!email) {
    redirect("/forgot-password?error=missing_email");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/auth/callback?next=/reset-password",
  });

  if (error) {
    redirect("/forgot-password?error=reset_failed");
  }

  redirect("/forgot-password?success=email_sent");
}