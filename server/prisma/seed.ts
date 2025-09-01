// prisma/seed.ts
// If you configured a custom Prisma client output, import from that path instead.
// import { PrismaClient } from "../src/generated/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Ensure schemas exist (safe to re-run)
  await prisma.$executeRawUnsafe('CREATE SCHEMA IF NOT EXISTS "config";');
  await prisma.$executeRawUnsafe('CREATE SCHEMA IF NOT EXISTS "institution";');

  // All options in one createMany with skipDuplicates for idempotency
  await prisma.option.createMany({
    data: [
      // ----- Class Levels -----
      { category: "class_level", code: "P1", label: "Primary 1", sortOrder: 1 },
      { category: "class_level", code: "P2", label: "Primary 2", sortOrder: 2 },
      { category: "class_level", code: "P3", label: "Primary 3", sortOrder: 3 },
      { category: "class_level", code: "P4", label: "Primary 4", sortOrder: 4 },
      { category: "class_level", code: "P5", label: "Primary 5", sortOrder: 5 },
      { category: "class_level", code: "P6", label: "Primary 6", sortOrder: 6 },

      // ----- Subjects -----
      {
        category: "subject",
        code: "ENG",
        label: "English Language",
        sortOrder: 1,
      },
      {
        category: "subject",
        code: "MTL",
        label: "Mother Tongue Language",
        sortOrder: 2,
      },
      { category: "subject", code: "MATH", label: "Mathematics", sortOrder: 3 },
      { category: "subject", code: "SCI", label: "Science", sortOrder: 4 },
      { category: "subject", code: "ART", label: "Art", sortOrder: 5 },
      { category: "subject", code: "MUS", label: "Music", sortOrder: 6 },
      {
        category: "subject",
        code: "PE",
        label: "Physical Education",
        sortOrder: 7,
      },
      {
        category: "subject",
        code: "SS",
        label: "Social Studies",
        sortOrder: 8,
      },
      {
        category: "subject",
        code: "CCE",
        label: "Character and Citizenship Education",
        sortOrder: 9,
      },
    ],
    skipDuplicates: true, // uses @@unique([category, code]) to ignore existing rows
  });

  console.log("✅ Seed complete (options inserted/skipped as needed)");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
