import { createClient } from "@/lib/supabase/server";
import { updateResetPassword } from "./actions";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    code?: string;
    success?: string;
    error?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;



  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <form
        action={updateResetPassword}
        className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <h1 className="text-3xl font-bold">Reset Password</h1>

        <p className="mt-2 text-zinc-400">
          Choose a new password for your account.
        </p>

        {params.success && (
          <div className="mt-4 rounded-lg border border-green-800 bg-green-950/40 p-4 text-green-300">
            Password updated successfully. You can now log in.
          </div>
        )}

        {params.error === "weak_password" && (
          <div className="mt-4 rounded-lg border border-red-800 bg-red-950/40 p-4 text-red-300">
            Password must contain at least 8 characters, including uppercase,
            lowercase, number, and special character.
          </div>
        )}

        {params.error && params.error !== "weak_password" && (
          <div className="mt-4 rounded-lg border border-red-800 bg-red-950/40 p-4 text-red-300">
            {params.error}
          </div>
        )}

        <div className="mt-6">
          <label className="mb-2 block">New Password</label>

          <input
            type="password"
            name="password"
            required
            minLength={8}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
        >
          Update Password
        </button>
      </form>
    </section>
  );
}