"use client";

import { useState } from "react";
import { updateApplicationStatus } from "./actions";

type Application = {
  id: string;
  company: string;
  position: string;
  status: string;
};

type KanbanBoardProps = {
  applications: Application[];
};

const columns = [
  {
    label: "Interested",
    status: "INTERESTED",
    color: "text-green-400",
  },
  {
    label: "Applied",
    status: "APPLIED",
    color: "text-blue-400",
  },
  {
    label: "HR Screen",
    status: "HR_SCREEN",
    color: "text-cyan-400",
  },
  {
    label: "Technical",
    status: "TECHNICAL_INTERVIEW",
    color: "text-yellow-400",
  },
  {
    label: "Final",
    status: "FINAL_INTERVIEW",
    color: "text-purple-400",
  },
  {
    label: "Offer",
    status: "OFFER",
    color: "text-emerald-400",
  },
  {
    label: "Rejected",
    status: "REJECTED",
    color: "text-red-400",
  },
];

export default function KanbanBoard({ applications }: KanbanBoardProps) {
  const [items, setItems] = useState(applications);

  async function handleDrop(applicationId: string, newStatus: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === applicationId
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    await updateApplicationStatus(applicationId, newStatus);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
      {columns.map((column) => {
        const columnApplications = items.filter(
          (application) => application.status === column.status
        );

        return (
          <div
            key={column.status}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              const applicationId = event.dataTransfer.getData("applicationId");
              handleDrop(applicationId, column.status);
            }}
            className="min-h-80 rounded-xl bg-zinc-900 p-4"
          >
            <h2 className={`mb-4 text-xl font-bold ${column.color}`}>
              {column.label} ({columnApplications.length})
            </h2>

            <div className="space-y-3">
              {columnApplications.map((application) => (
                <div
                  key={application.id}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData(
                      "applicationId",
                      application.id
                    );
                  }}
                  className="cursor-grab rounded-lg border border-zinc-800 bg-zinc-950 p-3 active:cursor-grabbing"
                >
                  <h3 className="font-semibold">{application.company}</h3>

                  <p className="text-sm text-zinc-400">
                    {application.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}