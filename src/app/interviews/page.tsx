import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export default async function InterviewsPage() {
  const interviews = await prisma.interview.findMany({
    include: {
      application: true,
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });

  return (
    <section>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Interviews
          </h1>

          <p className="mt-2 text-zinc-400">
            Track your upcoming interviews.
          </p>
        </div>

        <Link
          href="/interviews/new"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
        >
          + Add Interview
        </Link>
      </div>

      {interviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No interviews scheduled
          </h2>

          <p className="mt-2 text-zinc-400">
            Interviews will appear here once they are created.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <h2 className="text-xl font-semibold">
                {interview.type}
              </h2>

              <p className="mt-2 text-zinc-400">
                {interview.application.company}
              </p>

              <p className="text-zinc-500">
                {interview.application.position}
              </p>

              <p className="mt-3 text-sm text-zinc-400">
                {interview.scheduledAt.toLocaleString()}
              </p>

              {interview.notes && (
                <p className="mt-3 text-zinc-300">
                  {interview.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}