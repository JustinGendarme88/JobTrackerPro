import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { deleteApplication } from "./actions";
import DeleteButton from "@/components/DeleteButton";

type ApplicationsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

export default async function ApplicationsPage({
  searchParams,
}: ApplicationsPageProps) {
  const params = await searchParams;
  const search = params.search ?? "";
  const status = params.status ?? "ALL";

  const applications = await prisma.jobApplication.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                {
                  position: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  company: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  location: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
        status !== "ALL"
          ? {
              status,
            }
          : {},
      ],
    },
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
    <section>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Job Applications</h1>
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

      <form
        className="mb-6 flex flex-col gap-3 lg:flex-row"
        action="/applications">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by position, company, or location..."
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
        />

        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="ALL">All Status</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="INTERESTED">Interested</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
        >
          Search
        </button>

        {(search || status !== "ALL") && (
          <Link
            href="/applications"
            className="rounded-lg border border-zinc-700 px-5 py-3 text-center font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Clear
          </Link>
        )}
      </form>

      <div className="mb-4 text-sm text-zinc-400">
        {applications.length} application
        {applications.length !== 1 ? "s" : ""} found
      </div>

      {applications.length === 0 ? (
  <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-10 text-center">
    <h2 className="text-2xl font-semibold text-white">
      No applications found
    </h2>

    <p className="mt-2 text-zinc-400">
      Try adjusting your search filters or create a new job application.
    </p>

        <Link
          href="/applications/new"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
        >
          + Add Application
        </Link>
      </div>
    ) : (
      <div className="grid gap-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
          >
            {/* ta card actuelle ici */}
          </div>
        ))}
      </div>
    )}
        </section>
  );
}