import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex min-h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950 px-6 py-6 text-white">
      <div className="mb-10">
        <h1 className="text-xl font-bold">Job Tracker Pro</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Application tracker
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/"
          className="rounded-lg px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          href="/applications"
          className="rounded-lg px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          Applications
        </Link>

        <Link
          href="/applications/new"
          className="rounded-lg px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          New Application
        </Link>
      </nav>

      <div className="mt-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <p className="text-sm font-medium">Next step</p>
        <p className="mt-1 text-sm text-zinc-400">
          Add filters, auth, and calendar features.
        </p>
      </div>
    </aside>
  );
}