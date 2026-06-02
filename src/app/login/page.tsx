import { login } from "./actions";

export default function LoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <form
        action={login}
        className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <h1 className="text-3xl font-bold">Login</h1>

        <p className="mt-2 text-zinc-400">
          Sign in to access your job tracker.
        </p>

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
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
        >
          Login
        </button>
      </form>
    </section>
  );
}