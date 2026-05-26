import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "justin@example.com" },
    update: {},
    create: {
        email: "justin@example.com",
    },
  });

  await prisma.jobApplication.createMany({
    data: [
      {
        userId: user.id,
        company: "Momentous",
        position: "Junior Full Stack Developer",
        location: "Remote",
        status: "APPLIED",
      },
      {
        userId: user.id,
        company: "GIRO",
        position: "Junior Software Developer",
        location: "Montreal",
        status: "INTERVIEW",
      },
      {
        userId: user.id,
        company: "FlightHub",
        position: "PHP Developer",
        location: "Montreal",
        status: "INTERESTED",
      },
    ],
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });