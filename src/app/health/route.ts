/** Liveness only: staging has no database-dependent public feature yet. */
export function GET() {
  return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
}
