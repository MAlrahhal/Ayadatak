import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const port = 3017;
const origin = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  stdio: "ignore",
  env: { ...process.env, NODE_ENV: "production" },
});

try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    if (child.exitCode !== null) throw new Error("Production server exited before becoming ready");
    try {
      const response = await fetch(`${origin}/health`);
      if (response.status === 200) { ready = true; break; }
    } catch { /* wait for startup */ }
    await delay(250);
  }
  if (!ready) throw new Error("Production server did not become ready");
  const cases = [
    ["/", 200], ["/demo", 200], ["/demo/demo", 200], ["/demo/sakeena-demo", 200],
    ["/demo/no-such-clinic", 404], ["/dashboard-demo", 404], ["/dashboard-demo?preview=1", 404], ["/health", 200],
  ];
  for (const [path, expected] of cases) {
    const response = await fetch(`${origin}${path}`);
    if (response.status !== expected) throw new Error(`${path}: expected ${expected}, received ${response.status}`);
    if (path === "/") {
      const html = await response.text();
      if (!html.includes('name="robots" content="noindex, nofollow"') || html.includes('rel="canonical"'))
        throw new Error("Staging homepage must be noindex/nofollow without a production canonical URL");
    }
    process.stdout.write(`${path}: ${response.status}\n`);
  }
} finally {
  child.kill();
}
