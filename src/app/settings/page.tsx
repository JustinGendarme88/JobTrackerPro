import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";
import { updatePassword } from "./actions";
import { formatDateTime } from "@/lib/formatDate";

type SettingsPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

export default async function SettingsPage({
  searchParams,
}: SettingsPageProps) {
  const params = await searchParams;
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

        {params.success === "password_updated" && (
          <div className="mt-4 rounded-lg border border-green-800 bg-green-950/40 p-4 text-green-300">
            Password updated successfully.
          </div>
        )}

        {params.error === "weak_password" && (
          <div className="mt-4 rounded-lg border border-red-800 bg-red-950/40 p-4 text-red-300">
            Password must contain at least 8 characters, including an uppercase
            letter, a lowercase letter, a number, and a special character.
          </div>
        )}

        {params.error === "not_authenticated" && (
          <div className="mt-4 rounded-lg border border-red-800 bg-red-950/40 p-4 text-red-300">
            Your session has expired. Please sign in again.
          </div>
        )}

        {params.error &&
          params.error !== "weak_password" &&
          params.error !== "not_authenticated" && (
            <div className="mt-4 rounded-lg border border-red-800 bg-red-950/40 p-4 text-red-300">
              {params.error}
            </div>
          )}
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
                {formatDateTime(user.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-6 text-2xl font-semibold">
            Workspace Summary
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Applications</p>
              <p className="mt-2 text-3xl font-bold">
                {totalApplications}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Interviews</p>
              <p className="mt-2 text-3xl font-bold">
                {totalInterviews}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Documents</p>
              <p className="mt-2 text-3xl font-bold">
                {totalDocuments}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-green-900/60 bg-green-950/30 p-4">
            <p className="font-semibold text-green-300">
              Account status
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              Your account is active and your workspace data is private to your
              user account.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 xl:col-span-2">
          <h2 className="mb-6 text-2xl font-semibold">
            Security
          </h2>

          <p className="mb-6 text-zinc-400">
            Update your account password.
          </p>

          <form
            action={updatePassword}
            className="max-w-md space-y-4"
          >
            <div>
              <label className="mb-2 block">
                New Password
              </label>

              <input
                type="password"
                name="password"
                required
                minLength={8}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3"
              />

              <p className="mt-3 text-sm font-medium text-zinc-400">
                Password requirements:
              </p>

              <ul className="ml-5 mt-2 list-disc space-y-1 text-sm text-zinc-500">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}