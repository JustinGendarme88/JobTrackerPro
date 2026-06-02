import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { createInterview } from "../actions";

export default async function NewInterviewPage() {
  const applications = await prisma.jobApplication.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section>
      <div className="mb-8">
        <Link
          href="/interviews"
          className="text-zinc-400 hover:text-white"
        >
          ← Back to interviews
        </Link>

        <h1 className="mt-4 text-4xl font-bold">
          New Interview
        </h1>

        <p className="mt-2 text-zinc-400">
          Schedule an interview and link it to an existing job application.
        </p>
      </div>

      <form
        action={createInterview}
        className="max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Linked Application
          </label>

          <select
            name="applicationId"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          >
            <option value="">Select an application</option>

            {applications.map((application) => (
              <option key={application.id} value={application.id}>
                {application.company} - {application.position}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Interview Type
          </label>

          <select
            name="type"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          >
            <option value="HR Screening">HR Screening</option>
            <option value="Technical Interview">
              Technical Interview
            </option>
            <option value="Team Interview">Team Interview</option>
            <option value="Final Interview">Final Interview</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Date and Time
          </label>

          <input
            type="datetime-local"
            name="scheduledAt"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Notes
          </label>

          <textarea
            name="notes"
            rows={5}
            placeholder="Add preparation notes, recruiter name, meeting link, or interview details..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
        >
          Create Interview
        </button>
      </form>
    </section>
  );
}