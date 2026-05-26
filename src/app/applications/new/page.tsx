import { createApplication } from "../actions";

export default function NewApplicationPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Add Application
        </h1>
            <a href="/applications" className="text-zinc-400 hover:text-white">
            ← Back to applications
            </a>
        <form
          action={createApplication}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2">
              Company
            </label>

            <input
              type="text"
              name="company"
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Position
            </label>

            <input
              type="text"
              name="position"
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Status
            </label>

            <select
              name="status"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3"
            >
              <option value="INTERESTED">
                Interested
              </option>

              <option value="APPLIED">
                Applied
              </option>

              <option value="INTERVIEW">
                Interview
              </option>

              <option value="REJECTED">
                Rejected
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold"
          >
            Create Application
          </button>
        </form>
      </div>
    </main>
  );
}