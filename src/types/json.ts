export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

export type ViewMode = 'tree' | 'formatted';

export interface ParseResult {
  ok: true;
  value: JsonValue;
}

export interface ParseError {
  ok: false;
  message: string;
}

export type JsonParseOutcome = ParseResult | ParseError;

export interface JsonStats {
  bytes: number;
  keys: number;
  arrays: number;
  depth: number;
}
