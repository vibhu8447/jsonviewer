import { useState } from 'react';
import type { JsonValue } from '../types/json';

interface JsonTreeProps {
  value: JsonValue;
  expandDepth?: number;
}

const DEFAULT_EXPAND_DEPTH = 1;

function getValueType(value: JsonValue): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function NodeLabel({ name }: { name?: string }) {
  if (name === undefined) return null;

  return (
    <span className="node-label">
      <span className="node-key">"{name}"</span>
      <span className="node-colon">: </span>
    </span>
  );
}

function PrimitiveValue({ value }: { value: string | number | boolean | null }) {
  if (value === null) {
    return <span className="primitive primitive--null">null</span>;
  }
  if (typeof value === 'string') {
    return <span className="primitive primitive--string">"{value}"</span>;
  }
  if (typeof value === 'number') {
    return <span className="primitive primitive--number">{value}</span>;
  }
  return <span className="primitive primitive--boolean">{String(value)}</span>;
}

function TreeNode({
  name,
  value,
  depth,
  expandDepth,
}: {
  name?: string;
  value: JsonValue;
  depth: number;
  expandDepth: number;
}) {
  const type = getValueType(value);
  const isContainer = type === 'object' || type === 'array';
  const [expanded, setExpanded] = useState(depth < expandDepth);

  if (!isContainer) {
    return (
      <div className="tree-node tree-node--leaf">
        <NodeLabel name={name} />
        <PrimitiveValue value={value as string | number | boolean | null} />
      </div>
    );
  }

  const entries: Array<[string, JsonValue]> = Array.isArray(value)
    ? value.map((item, index) => [String(index), item])
    : Object.entries(value as Record<string, JsonValue>);

  const openBracket = Array.isArray(value) ? '[' : '{';
  const closeBracket = Array.isArray(value) ? ']' : '}';

  return (
    <div className="tree-node">
      <button
        type="button"
        className="tree-toggle"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <span className="tree-chevron">{expanded ? '▼' : '▶'}</span>
        <NodeLabel name={name} />
        <span className="tree-bracket">{openBracket}</span>
        {!expanded && <span className="tree-summary">{entries.length} items</span>}
        {!expanded && <span className="tree-bracket">{closeBracket}</span>}
      </button>

      {expanded && (
        <div className="tree-children">
          {entries.map(([key, child]) => (
            <TreeNode
              key={key}
              name={key}
              value={child}
              depth={depth + 1}
              expandDepth={expandDepth}
            />
          ))}
          <div className="tree-close">
            <span className="tree-bracket">{closeBracket}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function JsonTree({ value, expandDepth = DEFAULT_EXPAND_DEPTH }: JsonTreeProps) {
  return (
    <div className="json-tree">
      <TreeNode value={value} depth={0} expandDepth={expandDepth} />
    </div>
  );
}
