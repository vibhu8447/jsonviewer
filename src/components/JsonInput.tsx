import { forwardRef } from 'react';

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const JsonInput = forwardRef<HTMLTextAreaElement, JsonInputProps>(
  function JsonInput({ value, onChange, error }, ref) {
    return (
      <div className="panel panel--input">
        <div className="panel-header">
          <h2>Input</h2>
        </div>
        <textarea
          ref={ref}
          className={`json-textarea ${error ? 'json-textarea--error' : ''}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          placeholder='{ "hello": "world" }'
        />
        {error && <div className="error-banner">{error}</div>}
      </div>
    );
  },
);
