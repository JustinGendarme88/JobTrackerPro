import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

type ApplicationDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplicationDetailsPage({
  params,
}: ApplicationDetailsPageProps) {
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
      <div className="mx-auto max-w-4xl">
        <Link href="/applications" className="text-zinc-400 hover:text-white">
          ← Back to applications
        </Link>

        <div className="mt-4 mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">{application.position}</h1>
            <p className="mt-2 text-xl text-zinc-400">
              {application.company}
            </p>
          </div>

          <Link
            href={`/applications/${application.id}/edit`}
            className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-black hover:bg-yellow-400"
          >
            Edit
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard label="Status" value={application.status} />
          <InfoCard label="Location" value={application.location} />
          <InfoCard label="Salary" value={application.salary} />
          <InfoCard label="Work Mode" value={application.workMode} />
          <InfoCard label="Recruiter" value={application.recruiterName} />
          <InfoCard label="Recruiter Email" value={application.recruiterEmail} />
        </div>

        {application.jobUrl && (
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Job Posting</h2>

            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-blue-400 hover:text-blue-300"
            >
              Open job posting →
            </a>
          </div>
        )}

        {application.jobDescription && (
          <TextSection
            title="Job Description"
            content={application.jobDescription}
          />
        )}

        {application.notes && (
          <TextSection title="Personal Notes" content={application.notes} />
        )}

        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Documents</h2>

          {documentsWithUrls.length === 0 ? (
            <p className="text-sm text-zinc-400">No documents uploaded.</p>
          ) : (
            <div className="space-y-3">
              {documentsWithUrls.map((document) => (
                <div
                  key={document.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                >
                  <p className="font-semibold">{document.fileName}</p>
                  <p className="text-sm text-zinc-400">{document.type}</p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Uploaded: {document.createdAt.toLocaleDateString()}
                  </p>

                  {document.fileSize && (
                    <p className="text-sm text-zinc-500">
                      Size: {Math.round(document.fileSize / 1024)} KB
                    </p>
                  )}

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
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Recruitment Timeline
          </h2>

          {application.stages.length === 0 ? (
            <p className="text-sm text-zinc-400">
              No recruitment stages recorded.
            </p>
          ) : (
            <div className="space-y-4">
              {application.stages.map((stage, index) => (
                <div key={stage.id} className="relative pl-8">
                  <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-blue-500" />

                  {index !== application.stages.length - 1 && (
                    <div className="absolute left-[7px] top-5 h-full w-[2px] bg-zinc-700" />
                  )}

                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{stage.stageType}</h3>

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
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value || "Not specified"}</p>
    </div>
  );
}

function TextSection({ title, content }: { title: string; content: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>

      <p className="whitespace-pre-line text-zinc-300">{content}</p>
    </div>
  );
}