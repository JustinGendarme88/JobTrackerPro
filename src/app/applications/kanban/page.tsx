import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";

export default async function KanbanPage() {
  const user = await requireCurrentUser();

  const applications = await prisma.jobApplication.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const interested = applications.filter(
    (app) => app.status === "INTERESTED"
  );

  const applied = applications.filter(
    (app) => app.status === "APPLIED"
  );

  const interview = applications.filter(
    (app) => app.status === "INTERVIEW"
  );

  const rejected = applications.filter(
    (app) => app.status === "REJECTED"
  );

  return (
    <section>
      <h1 className="mb-8 text-4xl font-bold">
        Kanban Board
      </h1>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-xl bg-zinc-900 p-4">
          <h2 className="mb-4 text-xl font-bold text-green-400">
            Interested ({interested.length})
          </h2>

          <div className="space-y-3">
            {interested.map((application) => (
              <div
                key={application.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"
              >
                <h3 className="font-semibold">
                  {application.company}
                </h3>

                <p className="text-sm text-zinc-400">
                  {application.position}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          <h2 className="mb-4 text-xl font-bold text-blue-400">
            Applied ({applied.length})
          </h2>

          <div className="space-y-3">
            {applied.map((application) => (
              <div
                key={application.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"
              >
                <h3 className="font-semibold">
                  {application.company}
                </h3>

                <p className="text-sm text-zinc-400">
                  {application.position}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          <h2 className="mb-4 text-xl font-bold text-yellow-400">
            Interview ({interview.length})
          </h2>

          <div className="space-y-3">
            {interview.map((application) => (
              <div
                key={application.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"
              >
                <h3 className="font-semibold">
                  {application.company}
                </h3>

                <p className="text-sm text-zinc-400">
                  {application.position}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          <h2 className="mb-4 text-xl font-bold text-red-400">
            Rejected ({rejected.length})
          </h2>

          <div className="space-y-3">
            {rejected.map((application) => (
              <div
                key={application.id}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"
              >
                <h3 className="font-semibold">
                  {application.company}
                </h3>

                <p className="text-sm text-zinc-400">
                  {application.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}