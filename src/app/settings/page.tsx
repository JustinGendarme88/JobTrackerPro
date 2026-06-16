import { requireCurrentUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await requireCurrentUser();

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your account information.
        </p>
      </div>

      <div className="max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-6 text-2xl font-semibold">
          Account Information
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-zinc-400">
              User ID
            </p>

            <p className="break-all">
              {user.id}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-400">
              Email
            </p>

            <p>
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}