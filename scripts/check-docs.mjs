import { readdir, readFile, access } from "node:fs/promises";
import { resolve, dirname, extname } from "node:path";

const root = resolve(import.meta.dirname, "..");
async function markdown(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await markdown(path)));
    else if (extname(path) === ".md") result.push(path);
  }
  return result;
}
const files = [
  ...(await markdown(resolve(root, "docs"))),
  ...(await markdown(resolve(root, ".scratch"))),
  ...["README.md", "AGENTS.md", "CONTEXT.md", "CONTRIBUTING.md"].map((name) =>
    resolve(root, name),
  ),
];
const failures = [];
const graph = new Map();
for (const path of files) {
  const text = await readFile(path, "utf8");
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const local = resolve(
      dirname(path),
      decodeURIComponent(target.split("#")[0]),
    );
    try {
      await access(local);
    } catch {
      failures.push(path + ": missing link " + target);
    }
  }
  if (path.includes("/issues/")) {
    const id = text.match(/^# (CW-\d{3}) /)?.[1];
    if (!id) {
      failures.push(path + ": missing task ID");
      continue;
    }
    if (graph.has(id)) failures.push("Duplicate task " + id);
    const dependencies =
      text.match(/## Blocked by\n([\s\S]*?)(?=\n## |$)/)?.[1] ?? "";
    graph.set(
      id,
      [...dependencies.matchAll(/\[(CW-\d{3})\]/g)].map((match) => match[1]),
    );
  }
}
const visited = new Set();
const visiting = new Set();
function visit(id) {
  if (visiting.has(id)) {
    failures.push("Task dependency cycle at " + id);
    return;
  }
  if (visited.has(id)) return;
  if (!graph.has(id)) {
    failures.push("Missing dependency " + id);
    return;
  }
  visiting.add(id);
  for (const dependency of graph.get(id)) visit(dependency);
  visiting.delete(id);
  visited.add(id);
}
for (const id of graph.keys()) visit(id);
if (failures.length) {
  process.stderr.write(failures.join("\n") + "\n");
  process.exitCode = 1;
} else {
  process.stdout.write(
    "Validated " +
      files.length +
      " Markdown documents and " +
      graph.size +
      " acyclic tasks.\n",
  );
}
