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
  <main className="p-8">
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold">
          Job Applications
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage and track all your job applications.
        </p>
      </div>

      <Link
        href="/applications/new"
        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
      >
        + Add Application
      </Link>
    </div>

    <div className="grid gap-4">
      {applications.map((application) => (
        <div
          key={application.id}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">
                {application.position}
              </h2>

              <p className="text-zinc-400">
                {application.company}
              </p>

              <p className="text-zinc-500">
                {application.location}
              </p>
            </div>

            <div
              className={`rounded-lg px-3 py-1 text-sm ${getStatusColor(
                application.status
              )}`}
            >
              {application.status}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <Link
              href={`/applications/${application.id}/edit`}
              className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-400"
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
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500"
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