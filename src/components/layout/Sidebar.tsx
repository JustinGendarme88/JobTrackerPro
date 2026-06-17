import Link from "next/link";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Applications",
    href: "/applications",
  },
  {
    label: "Kanban",
    href: "/applications/kanban",
  },
  {
    label: "Interviews",
    href: "/interviews",
  },
  {
    label: "Calendar",
    href: "/calendar",
  },
  {
  label: "Settings",
  href: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950 px-6 py-6 text-white md:flex">
      <div className="mb-10">
        <h1 className="text-xl font-bold">Job Tracker Pro</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Application tracker
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-lg px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/applications/new"
        className="mt-8 rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold hover:bg-blue-500"
      >
        + Add Application
      </Link>

      <div className="mt-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <p className="text-sm font-medium">Next step</p>
        <p className="mt-1 text-sm text-zinc-400">
          Add filters, auth, and calendar features.
        </p>
      </div>
    </aside>
  );
}