import { sendPasswordResetEmail } from "./actions";

type ForgotPasswordPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const params = await searchParams;

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <form
        action={sendPasswordResetEmail}
        className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <h1 className="text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mt-2 text-zinc-400">
          Enter your email address and we&apos;ll send you a password reset link.
        </p>

        {params.success && (
          <div className="mt-4 rounded-lg border border-green-800 bg-green-950/40 p-4 text-green-300">
            Password reset email sent.
          </div>
        )}

        {params.error && (
          <div className="mt-4 rounded-lg border border-red-800 bg-red-950/40 p-4 text-red-300">
            Unable to send reset email.
          </div>
        )}

        <div className="mt-6">
          <label className="mb-2 block">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
        >
          Send Reset Link
        </button>
      </form>
    </section>
  );
}