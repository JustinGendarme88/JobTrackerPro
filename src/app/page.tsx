import Link from "next/link";

const features = [
  "Application tracking",
  "Interview management",
  "Calendar view",
  "Kanban pipeline",
  "Performance analytics",
  "Secure user accounts",
];

export default function LandingPage() {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="flex min-h-[75vh] flex-col items-center justify-center text-center">
        <p className="mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          Job search tracking for developers and professionals
        </p>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Track your job applications, interviews and progress.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Job Tracker Pro helps you organize applications, manage interviews,
          view your progress with analytics, and track your hiring pipeline with
          a Kanban board.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="mb-16 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="text-3xl font-bold">
          Everything you need to manage your job search
        </h2>

        <p className="mt-3 max-w-3xl text-zinc-400">
          Keep your applications, interviews, notes and hiring pipeline organized
          in one focused workspace.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <p className="font-semibold text-zinc-100">
                ✓ {feature}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 pb-16 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold">Application Tracking</h2>
          <p className="mt-3 text-zinc-400">
            Save companies, positions, locations, statuses and notes in one
            place.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold">Interview Calendar</h2>
          <p className="mt-3 text-zinc-400">
            Schedule interviews and view them by date with useful details.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-bold">Kanban Pipeline</h2>
          <p className="mt-3 text-zinc-400">
            Visualize your job search pipeline from interest to interview.
          </p>
        </div>
      </div>
    </section>
  );
}