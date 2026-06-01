"use client";

import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";

function getPageInfo(pathname: string) {
  if (pathname === "/") {
    return {
      title: "Dashboard",
      description: "Manage your applications and interviews",
    };
  }

  if (pathname === "/applications") {
    return {
      title: "Applications",
      description: "View, search, and manage your job applications",
    };
  }

  if (pathname === "/applications/new") {
    return {
      title: "New Application",
      description: "Add a new job opportunity to your tracker",
    };
  }

  if (
    pathname.startsWith("/applications/") &&
    pathname.endsWith("/edit")
  ) {
    return {
      title: "Edit Application",
      description: "Update the details of this job application",
    };
  }

  return {
    title: "Job Tracker Pro",
    description: "Track your applications and interviews",
  };
}

export default function Topbar() {
  const pathname = usePathname();
  const pageInfo = getPageInfo(pathname);

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 py-4 md:px-8">
      <div className="flex items-center gap-4">
        <MobileNav />

        <div>
          <h2 className="text-xl font-semibold text-white">
            {pageInfo.title}
          </h2>

          <p className="hidden text-sm text-zinc-400 sm:block">
            {pageInfo.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white sm:block">
          Notifications
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          J
        </div>
      </div>
    </header>
  );
}