import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

// Charge .env.local comme Next.js, pour que la CLI Prisma utilise les mêmes variables.
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
