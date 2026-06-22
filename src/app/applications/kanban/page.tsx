import { prisma } from "@/app/lib/prisma";
import { requireCurrentUser } from "@/lib/auth";
import KanbanBoard from "./KanbanBoard";

export default async function KanbanPage() {
  const user = await requireCurrentUser();

  const applications = await prisma.jobApplication.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      company: true,
      position: true,
      status: true,
    },
  });

  return (
    <section>
      <h1 className="mb-8 text-4xl font-bold">Kanban Board</h1>

      <KanbanBoard applications={applications} />
    </section>
  );
}