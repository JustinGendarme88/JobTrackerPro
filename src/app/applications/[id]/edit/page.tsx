import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { updateApplication } from "../../actions";

type EditApplicationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditApplicationPage({
  params,
}: EditApplicationPageProps) {
  const { id } = await params;

  const application = await prisma.jobApplication.findUnique({
    where: {
      id,
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <section>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/applications"
          className="text-zinc-400 hover:text-white"
        >
          ← Back to applications
        </Link>

        <h1 className="text-4xl font-bold mt-4 mb-8">
          Edit Application
        </h1>

        <form action={updateApplication} className="space-y-6">
          <input type="hidden" name="id" value={application.id} />

          <div>
            <label className="block mb-2">Company</label>
            <input
              type="text"
              name="company"
              defaultValue={application.company}
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">Position</label>
            <input
              type="text"
              name="position"
              defaultValue={application.position}
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={application.location ?? ""}
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">Status</label>
            <select
              name="status"
              defaultValue={application.status}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3"
            >
              <option value="INTERESTED">Interested</option>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}