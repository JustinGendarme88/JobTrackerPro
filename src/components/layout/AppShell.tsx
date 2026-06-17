"use client";

import { usePathname } from "next/navigation";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <main className="p-6 md:p-8">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}