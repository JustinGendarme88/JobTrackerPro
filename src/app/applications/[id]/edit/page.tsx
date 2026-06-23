import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { updateApplication } from "../../actions";
import {
  uploadApplicationDocument,
  deleteApplicationDocument,
} from "../documents/actions";
import { createApplicationStage } from "../stages/actions";

type EditApplicationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditApplicationPage({
  params,
}: EditApplicationPageProps) {
  const user = await requireCurrentUser();
  const supabase = await createClient();
  const { id } = await params;

  const application = await prisma.jobApplication.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      documents: {
        orderBy: {
          createdAt: "desc",
        },
      },
      stages: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  if (!application) {
    notFound();
  }

  const documentsWithUrls = await Promise.all(
    application.documents.map(async (document) => {
      const { data } = await supabase.storage
        .from("application-documents")
        .createSignedUrl(document.filePath, 3600);

      return {
        ...document,
        url: data?.signedUrl ?? null,
      };
    })
  );

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
                <option value="HR_SCREEN">HR Screen</option>
                <option value="TECHNICAL_INTERVIEW">Technical Interview</option>
                <option value="FINAL_INTERVIEW">Final Interview</option>
                <option value="OFFER">Offer</option>
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
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block">Personal Notes</label>
            <textarea
              name="notes"
              rows={5}
              defaultValue={application.notes ?? ""}
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

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-4 text-xl font-semibold">Documents</h2>

          <div className="mb-6 space-y-3">
            {documentsWithUrls.length === 0 ? (
              <p className="text-sm text-zinc-400">No documents uploaded yet.</p>
            ) : (
              documentsWithUrls.map((document) => (
                <div
                  key={document.id}
                  className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"
                >
                  <p className="font-semibold">{document.fileName}</p>
                  <p className="text-sm text-zinc-400">{document.type}</p>

                  {document.url && (
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-blue-400 hover:text-blue-300"
                    >
                      Open document →
                    </a>
                    
                  )}

                  <form action={deleteApplicationDocument} className="mt-3">
                    <input type="hidden" name="documentId" value={document.id} />

                    <button
                      type="submit"
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-500"
                    >
                      Delete document
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>

          <form action={uploadApplicationDocument} className="space-y-4">
            <input type="hidden" name="applicationId" value={application.id} />

            <div>
              <label className="mb-2 block">Document Type</label>
              <select
                name="type"
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3"
              >
                <option value="JOB_OFFER_PDF">Job offer PDF</option>
                <option value="CV_SENT">CV sent</option>
                <option value="COVER_LETTER_SENT">Cover letter sent</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block">File</label>
              <input
                type="file"
                name="file"
                required
                accept=".pdf,.doc,.docx"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-zinc-800 px-5 py-3 font-semibold hover:bg-zinc-700"
            >
              Upload Document
            </button>
          </form>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-4 text-xl font-semibold">Recruitment Timeline</h2>

          <div className="mb-6 space-y-4">
            {application.stages.length === 0 ? (
              <p className="text-sm text-zinc-400">
                No recruitment stages yet.
              </p>
            ) : (
              application.stages.map((stage, index) => (
                <div key={stage.id} className="relative pl-8">
                  <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-blue-500" />

                  {index !== application.stages.length - 1 && (
                    <div className="absolute left-[7px] top-5 h-full w-[2px] bg-zinc-700" />
                  )}

                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">
                        {stage.stageType}
                      </h3>

                      <span className="text-sm text-zinc-400">
                        {stage.date.toLocaleDateString()}
                      </span>
                    </div>

                    {stage.notes && (
                      <p className="mt-2 text-sm text-zinc-400">
                        {stage.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <form action={createApplicationStage} className="space-y-4">
            <input type="hidden" name="applicationId" value={application.id} />

            <div>
              <label className="mb-2 block">Stage Type</label>
              <select
                name="stageType"
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3"
              >
                <option value="APPLIED">Applied</option>
                <option value="HR_SCREEN">HR Screen</option>
                <option value="TECHNICAL_INTERVIEW">Technical Interview</option>
                <option value="FINAL_INTERVIEW">Final Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block">Notes</label>
              <textarea
                name="notes"
                rows={4}
                placeholder="Add notes about this stage..."
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-zinc-800 px-5 py-3 font-semibold hover:bg-zinc-700"
            >
              Add Stage
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}