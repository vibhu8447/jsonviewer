import type { JsonStats, JsonValue, JsonParseOutcome } from '../types/json';

export function parseJson(input: string): JsonParseOutcome {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, message: 'JSON input is empty.' };
  }

  try {
    const value = JSON.parse(trimmed) as JsonValue;
    return { ok: true, value };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid JSON.';
    return { ok: false, message };
  }
}

export function formatJson(value: JsonValue, indent = 2): string {
  return JSON.stringify(value, null, indent);
}

export function minifyJson(value: JsonValue): string {
  return JSON.stringify(value);
}

export function computeStats(value: JsonValue, inputBytes: number): JsonStats {
  let keys = 0;
  let arrays = 0;
  let depth = 0;

  const walk = (node: JsonValue, level: number) => {
    depth = Math.max(depth, level);

    if (Array.isArray(node)) {
      arrays += 1;
      node.forEach((item) => walk(item, level + 1));
      return;
    }

    if (node !== null && typeof node === 'object') {
      const entries = Object.entries(node);
      keys += entries.length;
      entries.forEach(([, child]) => walk(child, level + 1));
    }
  };

  walk(value, 1);

  return { bytes: inputBytes, keys, arrays, depth };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
