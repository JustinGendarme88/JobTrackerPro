import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await requireCurrentUser();

  const applications = await prisma.jobApplication.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const upcomingInterviews = await prisma.interview.findMany({
    where: {
      scheduledAt: {
        gte: new Date(),
      },
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
    take: 3,
  });

  const totalApplications = applications.length;

  const interested = applications.filter(
    (app) => app.status === "INTERESTED"
  ).length;

  const applied = applications.filter((app) => app.status === "APPLIED").length;

  const hrScreen = applications.filter(
    (app) => app.status === "HR_SCREEN"
  ).length;

  const technicalInterview = applications.filter(
    (app) => app.status === "TECHNICAL_INTERVIEW"
  ).length;

  const finalInterview = applications.filter(
    (app) => app.status === "FINAL_INTERVIEW"
  ).length;

  const offers = applications.filter((app) => app.status === "OFFER").length;

  const rejected = applications.filter(
    (app) => app.status === "REJECTED"
  ).length;

  const interviewPipeline = hrScreen + technicalInterview + finalInterview;

  const interviewRate =
    totalApplications > 0
      ? Math.round((interviewPipeline / totalApplications) * 100)
      : 0;

  const rejectionRate =
    totalApplications > 0
      ? Math.round((rejected / totalApplications) * 100)
      : 0;

  const progressRate =
    totalApplications > 0
      ? Math.round(
          ((applied + interviewPipeline + offers) / totalApplications) * 100
        )
      : 0;

  const offerRate =
    totalApplications > 0
      ? Math.round((offers / totalApplications) * 100)
      : 0;

  const statusStats = [
    { label: "Interested", count: interested, color: "bg-green-600" },
    { label: "Applied", count: applied, color: "bg-blue-600" },
    { label: "HR Screen", count: hrScreen, color: "bg-cyan-600" },
    {
      label: "Technical",
      count: technicalInterview,
      color: "bg-yellow-500",
    },
    { label: "Final", count: finalInterview, color: "bg-purple-600" },
    { label: "Offer", count: offers, color: "bg-emerald-600" },
    { label: "Rejected", count: rejected, color: "bg-red-600" },
  ];

  const maxStatusCount = Math.max(
    ...statusStats.map((status) => status.count),
    1
  );

  return (
    <section>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold">Job Tracker Pro</h1>

            <p className="mt-2 text-zinc-400">
              Track your applications and interviews
            </p>
          </div>

          <Link
            href="/applications"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
          >
            View Applications
          </Link>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="mb-2 text-zinc-400">Total Applications</p>
            <h2 className="text-4xl font-bold">{totalApplications}</h2>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="mb-2 text-zinc-400">Interview Pipeline</p>
            <h2 className="text-4xl font-bold text-blue-400">
              {interviewPipeline}
            </h2>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="mb-2 text-zinc-400">Offers</p>
            <h2 className="text-4xl font-bold text-emerald-400">{offers}</h2>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="mb-2 text-zinc-400">Rejected</p>
            <h2 className="text-4xl font-bold text-red-400">{rejected}</h2>
          </div>
        </div>

        <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Performance Metrics</h2>

            <p className="mt-1 text-sm text-zinc-400">
              Key indicators based on your current application pipeline.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-400">Interview Rate</p>
              <h3 className="mt-2 text-3xl font-bold text-blue-400">
                {interviewRate}%
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Applications currently in the interview pipeline.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-400">Offer Rate</p>
              <h3 className="mt-2 text-3xl font-bold text-emerald-400">
                {offerRate}%
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Applications that reached offer stage.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-400">Rejection Rate</p>
              <h3 className="mt-2 text-3xl font-bold text-red-400">
                {rejectionRate}%
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Applications marked as rejected.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-sm text-zinc-400">Progress Rate</p>
              <h3 className="mt-2 text-3xl font-bold text-green-400">
                {progressRate}%
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Applications beyond initial interest.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Applications by Status</h2>

            <p className="mt-1 text-sm text-zinc-400">
              Overview of your current hiring pipeline.
            </p>
          </div>

          <div className="space-y-4">
            {statusStats.map((status) => (
              <div key={status.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-300">
                    {status.label}
                  </span>

                  <span className="text-zinc-400">{status.count}</span>
                </div>

                <div className="h-3 rounded-full bg-zinc-800">
                  <div
                    className={`h-3 rounded-full ${status.color}`}
                    style={{
                      width: `${(status.count / maxStatusCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Applications</h2>

              <Link
                href="/applications/new"
                className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-500"
              >
                + Add
              </Link>
            </div>

            {applications.length === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-center">
                <h3 className="text-xl font-semibold">No applications yet</h3>

                <p className="mt-2 text-zinc-400">
                  Create your first job application to start tracking your job
                  search.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 5).map((application) => (
                  <div
                    key={application.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {application.position}
                        </h3>

                        <p className="text-zinc-400">
                          {application.company}
                        </p>
                      </div>

                      <div className="rounded-lg bg-blue-600 px-3 py-1 text-sm">
                        {application.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming Interviews</h2>

              <Link
                href="/interviews/new"
                className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-500"
              >
                + Add
              </Link>
            </div>

            {upcomingInterviews.length === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-center">
                <h3 className="text-xl font-semibold">
                  No upcoming interviews
                </h3>

                <p className="mt-2 text-zinc-400">
                  Scheduled interviews will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
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

                      <div className="text-right text-sm text-zinc-400">
                        {interview.scheduledAt.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}