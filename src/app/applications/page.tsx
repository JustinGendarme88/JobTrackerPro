import { prisma } from "@/app/lib/prisma";

export default async function ApplicationsPage() {
  const applications = await prisma.jobApplication.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Job Applications
      </h1>

      <div className="grid gap-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
            <h2 className="text-2xl font-semibold">
              {application.position}
            </h2>

            <p className="text-zinc-400">
              {application.company}
            </p>

            <p className="text-zinc-500">
              {application.location}
            </p>

            <div className="mt-3 inline-block bg-blue-600 px-3 py-1 rounded-lg text-sm">
              {application.status}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}