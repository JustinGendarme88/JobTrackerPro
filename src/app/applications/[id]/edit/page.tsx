import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";
import { updateApplication } from "../../actions";

type EditApplicationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditApplicationPage({
  params,
}: EditApplicationPageProps) {
  const user = await requireCurrentUser();
  const { id } = await params;

  const application = await prisma.jobApplication.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <section>
      <div className="mx-auto max-w-3xl">
        <Link href="/applications" className="text-zinc-400 hover:text-white">
          ← Back to applications
        </Link>

        <h1 className="mt-4 mb-8 text-4xl font-bold">Edit Application</h1>

        <form action={updateApplication} className="space-y-6">
          <input type="hidden" name="id" value={application.id} />

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block">Company</label>
              <input
                type="text"
                name="company"
                defaultValue={application.company}
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block">Position</label>
              <input
                type="text"
                name="position"
                defaultValue={application.position}
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={application.location ?? ""}
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block">Status</label>
              <select
                name="status"
                defaultValue={application.status}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
              >
                <option value="INTERESTED">Interested</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block">Job Posting URL</label>
            <input
              type="url"
              name="jobUrl"
              defaultValue={application.jobUrl ?? ""}
              placeholder="https://www.linkedin.com/jobs/view/..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block">Salary</label>
              <input
                type="text"
                name="salary"
                defaultValue={application.salary ?? ""}
                placeholder="Example: 75,000 CAD/year"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block">Work Mode</label>
              <select
                name="workMode"
                defaultValue={application.workMode ?? ""}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
              >
                <option value="">Not specified</option>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
                <option value="ON_SITE">On-site</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block">Recruiter Name</label>
              <input
                type="text"
                name="recruiterName"
                defaultValue={application.recruiterName ?? ""}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block">Recruiter Email</label>
              <input
                type="email"
                name="recruiterEmail"
                defaultValue={application.recruiterEmail ?? ""}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block">Job Description</label>
            <textarea
              name="jobDescription"
              rows={10}
              defaultValue={application.jobDescription ?? ""}
              placeholder="Paste the job posting text here..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block">Personal Notes</label>
            <textarea
              name="notes"
              rows={5}
              defaultValue={application.notes ?? ""}
              placeholder="Add your own notes about this application..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}