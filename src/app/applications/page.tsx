import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import {
  deleteApplication,
} from "./actions";

  export default async function ApplicationsPage() {
    const applications =
      await prisma.jobApplication.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

  function getStatusColor(status: string) {
    switch (status) {
      case "APPLIED":
        return "bg-blue-600";

      case "INTERVIEW":
        return "bg-yellow-500 text-black";

      case "REJECTED":
        return "bg-red-600";

      case "INTERESTED":
        return "bg-green-600";

      default:
        return "bg-zinc-600";
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/"
            className="text-zinc-400 hover:text-white"
          >
            ← Back to dashboard
          </Link>

          <h1 className="text-4xl font-bold mt-4">
            Job Applications
          </h1>
        </div>

        <Link
          href="/applications/new"
          className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-lg font-semibold"
        >
          + Add Application
        </Link>
      </div>

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

            <div className={`mt-3 inline-block px-3 py-1 rounded-lg text-sm ${getStatusColor(application.status)}`}>
              {application.status}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/applications/${application.id}/edit`}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Edit
              </Link>

              <form action={deleteApplication}>
                <input
                  type="hidden"
                  name="id"
                  value={application.id}
                />

                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}