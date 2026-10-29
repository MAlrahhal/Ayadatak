import nextEnv from "@next/env";
import { defineConfig } from "prisma/config";

// Prisma CLI runs outside Next.js; load the ignored local development environment.
nextEnv.loadEnvConfig(process.cwd(), true);

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env.DATABASE_URL_UNPOOLED ?? "" },
});
