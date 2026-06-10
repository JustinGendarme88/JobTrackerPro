import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";

export default async function CalendarPage() {
  const user = await requireCurrentUser();
  const interviews = await prisma.interview.findMany({
    where: {
      application: {
        userId: user.id,
      },
    },
    include: {
      application: true,
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });

  const groupedInterviews = interviews.reduce<Record<string, typeof interviews>>(
    (groups, interview) => {
      const dateKey = interview.scheduledAt.toLocaleDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(interview);

      return groups;
    },
    {}
  );

  return (
    <section>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Calendar</h1>

          <p className="mt-2 text-zinc-400">
            View your scheduled interviews by date.
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
          <h2 className="text-2xl font-semibold">No events scheduled</h2>

          <p className="mt-2 text-zinc-400">
            Your interviews will appear here once scheduled.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedInterviews).map(([date, items]) => (
            <div
              key={date}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h2 className="mb-4 text-2xl font-bold">{date}</h2>

              <div className="space-y-3">
                {items.map((interview) => (
                  <div
                    key={interview.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {interview.type}
                        </h3>

                        <p className="text-zinc-400">
                          {interview.application.company}
                        </p>

                        <p className="text-zinc-500">
                          {interview.application.position}
                        </p>
                      </div>

                      <p className="text-sm text-zinc-400">
                        {interview.scheduledAt.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}