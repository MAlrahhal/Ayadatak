import "server-only";

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required for server-side database access");
}

const adapter = new PrismaNeon({ connectionString });

// Creating the client does not query or modify the database.
export const prisma = new PrismaClient({ adapter });
