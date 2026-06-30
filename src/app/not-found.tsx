import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
          404
        </p>

        <h1 className="text-4xl font-bold">Page not found</h1>

        <p className="mt-4 text-zinc-400">
          The page you are looking for does not exist or you may not have
          permission to access it.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/applications"
            className="rounded-lg border border-zinc-700 px-5 py-3 font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            View Applications
          </Link>
        </div>
      </div>
    </section>
  );
}