import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await requireCurrentUser();

  const totalApplications = await prisma.jobApplication.count({
    where: {
      userId: user.id,
    },
  });

  const totalInterviews = await prisma.interview.count({
    where: {
      application: {
        userId: user.id,
      },
    },
  });

  const totalDocuments = await prisma.applicationDocument.count({
    where: {
      application: {
        userId: user.id,
      },
    },
  });

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Settings</h1>

        <p className="mt-2 text-zinc-400">
          Manage your account information and workspace overview.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-6 text-2xl font-semibold">
            Account Information
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-zinc-400">User ID</p>

              <p className="break-all text-zinc-200">{user.id}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-400">Email</p>

              <p className="text-zinc-200">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-400">Account created</p>

              <p className="text-zinc-200">
                {user.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-6 text-2xl font-semibold">Workspace Summary</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Applications</p>
              <p className="mt-2 text-3xl font-bold">{totalApplications}</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Interviews</p>
              <p className="mt-2 text-3xl font-bold">{totalInterviews}</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Documents</p>
              <p className="mt-2 text-3xl font-bold">{totalDocuments}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-green-900/60 bg-green-950/30 p-4">
            <p className="font-semibold text-green-300">Account status</p>

            <p className="mt-1 text-sm text-zinc-400">
              Your account is active and your workspace data is private to your
              user account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}