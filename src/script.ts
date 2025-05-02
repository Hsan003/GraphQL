// 1
import { PrismaClient } from "@prisma/client";

// 2
const prisma = new PrismaClient();

// 3
async function main() {
  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: { name: "Alice", email: "alice@example.com", role: "ADMIN" },
    }),
    prisma.user.create({
      data: { name: "Bob", email: "bob@example.com", role: "USER" },
    }),
  ]);

  // Create Skills
  const skills = await Promise.all([
    prisma.skill.create({ data: { designation: "JavaScript" } }),
    prisma.skill.create({ data: { designation: "TypeScript" } }),
    prisma.skill.create({ data: { designation: "GraphQL" } }),
    prisma.skill.create({ data: { designation: "Prisma" } }),
  ]);

  // Create CVs
  await prisma.cv.create({
    data: {
      name: "Alice CV",
      age: 30,
      job: "Full-stack Developer",
      owner: { connect: { id: users[0].id } },
      skills: { connect: skills.slice(0, 3).map((s) => ({ id: s.id })) },
    },
  });

  await prisma.cv.create({
    data: {
      name: "Bob CV",
      age: 25,
      job: "Frontend Developer",
      owner: { connect: { id: users[1].id } },
      skills: {
        connect: [skills[0], skills[1], skills[2]].map((s) => ({ id: s.id })),
      },
    },
  });

  console.log("✅ Database has been seeded.");
}

// 4
main()
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
