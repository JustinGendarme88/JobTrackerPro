import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { updateInterview } from "../../actions";

type EditInterviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDateForInput(date: Date) {
  return date.toISOString().slice(0, 16);
}

export default async function EditInterviewPage({
  params,
}: EditInterviewPageProps) {
  const { id } = await params;

  const interview = await prisma.interview.findUnique({
    where: {
      id,
    },
  });

  if (!interview) {
    notFound();
  }

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
          Edit Interview
        </h1>

        <p className="mt-2 text-zinc-400">
          Update this interview and its linked application.
        </p>
      </div>

      <form
        action={updateInterview}
        className="max-w-2xl rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <input type="hidden" name="id" value={interview.id} />

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Linked Application
          </label>

          <select
            name="applicationId"
            defaultValue={interview.applicationId}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          >
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
            defaultValue={interview.type}
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
            defaultValue={formatDateForInput(interview.scheduledAt)}
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
            defaultValue={interview.notes ?? ""}
            placeholder="Add preparation notes, recruiter name, meeting link, or interview details..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}