import type { JsonValue } from '../types/json';

interface JsonFormattedViewProps {
  value: JsonValue;
}

function highlightJson(json: string): string {
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped
    .replace(
      /("(?:\\.|[^"\\])*")(\s*:)?/g,
      (_match, token: string, colon?: string) => {
        if (colon) {
          return `<span class="hl-key">${token}</span><span class="hl-punct">:</span>`;
        }
        return `<span class="hl-string">${token}</span>`;
      },
    )
    .replace(/\b(true|false|null)\b/g, '<span class="hl-literal">$1</span>')
    .replace(/\b(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/g, '<span class="hl-number">$1</span>')
    .replace(/([{}\[\],])/g, '<span class="hl-punct">$1</span>');
}

export function JsonFormattedView({ value }: JsonFormattedViewProps) {
  const formatted = JSON.stringify(value, null, 2);

  return (
    <pre
      className="json-formatted"
      dangerouslySetInnerHTML={{ __html: highlightJson(formatted) }}
    />
  );
}
