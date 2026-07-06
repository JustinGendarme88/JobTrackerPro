import { signup } from "./actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const { error } = await searchParams;

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <form
        action={signup}
        className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <h1 className="text-3xl font-bold">Sign Up</h1>

        <p className="mt-2 text-zinc-400">
          Create your Job Tracker Pro account.
        </p>

        {error === "weak_password" && (
          <div className="mt-4 rounded-lg border border-red-600 bg-red-950 p-3 text-sm text-red-300">
            Password must contain at least 8 characters, one uppercase letter,
            one lowercase letter, one number and one special character.
          </div>
        )}

        {error === "signup_failed" && (
          <div className="mt-4 rounded-lg border border-red-600 bg-red-950 p-3 text-sm text-red-300">
            Unable to create your account. Please try again.
          </div>
        )}

        <div className="mt-6">
          <label className="mb-2 block text-sm text-zinc-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm text-zinc-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            required
            minLength={8}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          />

          <p className="mt-2 text-xs text-zinc-500">
            Must contain at least 8 characters, one uppercase letter, one
            lowercase letter, one number and one special character.
          </p>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
        >
          Create Account
        </button>
      </form>
    </section>
  );
}