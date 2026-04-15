import { spawn } from "node:child_process";

function usage() {
  // eslint-disable-next-line no-console
  console.error(
    "Usage: node scripts/retry-command.mjs --retries <n> --backoff-ms <ms> -- <command> [args...]\n" +
      "Env: RETRY_RETRIES, RETRY_BACKOFF_MS, RETRY_BACKOFF_MULTIPLIER, RETRY_MAX_BACKOFF_MS"
  );
}

function parseArgs(argv) {
  const result = {
    retries: Number(process.env.RETRY_RETRIES ?? 3),
    backoffMs: Number(process.env.RETRY_BACKOFF_MS ?? 2000),
    backoffMultiplier: Number(process.env.RETRY_BACKOFF_MULTIPLIER ?? 2),
    maxBackoffMs: Number(process.env.RETRY_MAX_BACKOFF_MS ?? 30000),
    command: null,
    commandArgs: [],
  };

  const args = [...argv];
  while (args.length) {
    const token = args.shift();
    if (token === "--") break;
    if (token === "--retries") result.retries = Number(args.shift());
    else if (token === "--backoff-ms") result.backoffMs = Number(args.shift());
    else if (token === "--backoff-multiplier") result.backoffMultiplier = Number(args.shift());
    else if (token === "--max-backoff-ms") result.maxBackoffMs = Number(args.shift());
    else if (token === "-h" || token === "--help") return { help: true };
    else return { error: `Unknown option: ${token}` };
  }

  if (args.length === 0) return { error: "Missing command after --" };
  result.command = args.shift();
  result.commandArgs = args;

  if (!Number.isFinite(result.retries) || result.retries < 0) return { error: "Invalid --retries" };
  if (!Number.isFinite(result.backoffMs) || result.backoffMs < 0) return { error: "Invalid --backoff-ms" };
  if (!Number.isFinite(result.backoffMultiplier) || result.backoffMultiplier < 1)
    return { error: "Invalid --backoff-multiplier" };
  if (!Number.isFinite(result.maxBackoffMs) || result.maxBackoffMs < 0)
    return { error: "Invalid --max-backoff-ms" };

  return result;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function runOnce(command, commandArgs) {
  return new Promise((resolve) => {
    const child = spawn(command, commandArgs, {
      stdio: "inherit",
      shell: false,
    });
    child.on("close", (code, signal) => {
      if (signal) resolve({ ok: false, code: 1, signal });
      else resolve({ ok: code === 0, code: code ?? 1, signal: null });
    });
    child.on("error", () => resolve({ ok: false, code: 1, signal: null }));
  });
}

const parsed = parseArgs(process.argv.slice(2));
if (parsed?.help) {
  usage();
  process.exit(0);
}
if (parsed?.error) {
  // eslint-disable-next-line no-console
  console.error(parsed.error);
  usage();
  process.exit(2);
}

const { retries, backoffMs, backoffMultiplier, maxBackoffMs, command, commandArgs } = parsed;

let attempt = 0;
while (attempt <= retries) {
  const res = await runOnce(command, commandArgs);
  if (res.ok) process.exit(0);
  attempt += 1;
  if (attempt > retries) process.exit(res.code);

  const delay = Math.min(maxBackoffMs, Math.round(backoffMs * backoffMultiplier ** (attempt - 1)));
  // eslint-disable-next-line no-console
  console.error(`Command failed (attempt ${attempt}/${retries}). Retrying in ${delay}ms...`);
  await sleep(delay);
}
