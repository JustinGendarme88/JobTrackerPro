"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function sendPasswordResetEmail(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  if (!email) {
    redirect("/forgot-password?error=missing_email");
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://job-tracker-pro-one.vercel.app";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
  });

  if (error) {
    console.error("RESET PASSWORD ERROR:", error.message);
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/forgot-password?success=email_sent");
}