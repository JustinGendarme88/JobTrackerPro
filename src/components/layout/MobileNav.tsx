"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white"
      >
        Menu
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60">
          <aside className="h-full w-72 bg-zinc-950 p-6 text-white border-r border-zinc-800">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Job Tracker Pro
              </h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/applications"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                Applications
              </Link>

              <Link
                href="/applications/new"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                New Application
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}