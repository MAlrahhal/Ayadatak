import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

nextEnv.loadEnvConfig(process.cwd(), true);

const connections = [
  ["pooled", process.env.DATABASE_URL],
  ["direct", process.env.DATABASE_URL_UNPOOLED],
];

let failed = false;

for (const [name, connectionString] of connections) {
  if (!connectionString) {
    console.error(`${name}: FAIL (not configured)`);
    failed = true;
    continue;
  }

  try {
    const sql = neon(connectionString);
    const rows = await sql`SELECT 1 AS ok`;
    if (rows.length !== 1 || rows[0].ok !== 1) {
      throw new Error("Unexpected read-only query result");
    }
    console.log(`${name}: PASS (SELECT 1)`);
  } catch {
    // Driver errors may include connection details; never print them.
    console.error(`${name}: FAIL (read-only connection test)`);
    failed = true;
  }
}

if (failed) process.exitCode = 1;
