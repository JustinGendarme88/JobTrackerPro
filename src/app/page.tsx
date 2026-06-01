import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export default async function HomePage() {
  const applications = await prisma.jobApplication.findMany();

  const totalApplications = applications.length;

  const interviews = applications.filter(
    (app) => app.status === "INTERVIEW"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "REJECTED"
  ).length;

  const interested = applications.filter(
    (app) => app.status === "INTERESTED"
  ).length;

  return (
    <section>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold">
              Job Tracker Pro
            </h1>

            <p className="text-zinc-400 mt-2">
              Track your applications and interviews
            </p>
          </div>

          <Link
            href="/applications"
            className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-semibold"
          >
            View Applications
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400 mb-2">
              Total Applications
            </p>

            <h2 className="text-4xl font-bold">
              {totalApplications}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400 mb-2">
              Interviews
            </p>

            <h2 className="text-4xl font-bold text-blue-400">
              {interviews}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400 mb-2">
              Interested
            </p>

            <h2 className="text-4xl font-bold text-yellow-400">
              {interested}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400 mb-2">
              Rejected
            </p>

            <h2 className="text-4xl font-bold text-red-400">
              {rejected}
            </h2>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Recent Applications
            </h2>

            <Link
              href="/applications/new"
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
            >
              + Add
            </Link>
          </div>

          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {application.position}
                    </h3>

                    <p className="text-zinc-400">
                      {application.company}
                    </p>
                  </div>

                  <div className="bg-blue-600 px-3 py-1 rounded-lg text-sm">
                    {application.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}