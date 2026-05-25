export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Job Tracker Pro
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Manage your job applications, interviews, follow-ups and career progression.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">
              Applications
            </h2>

            <p className="text-gray-400">
              Track all your job applications in one place.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">
              Interviews
            </h2>

            <p className="text-gray-400">
              Plan and organize your interviews and follow-ups.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-2">
              Calendar
            </h2>

            <p className="text-gray-400">
              Visualize your application timeline and upcoming events.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}