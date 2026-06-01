import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Job Tracker Pro",
  description: "Track your job applications, interviews, and opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-zinc-950 text-white">
          <Sidebar />

          <div className="flex min-h-screen flex-1 flex-col">
            <Topbar />

            <main className="flex-1 p-6 md:p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}