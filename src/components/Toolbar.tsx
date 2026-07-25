import { useRef, type ChangeEvent, type ReactNode } from 'react';
import {
  ClearIcon,
  CompressIcon,
  CopyIcon,
  FormatIcon,
  PasteIcon,
  UploadIcon,
} from './ToolbarIcons';

interface ToolbarProps {
  onPaste: () => void;
  onCopy: () => void;
  onFormat: () => void;
  onRemoveWhitespace: () => void;
  onClear: () => void;
  onFileLoad: (content: string) => void;
  onAbout: () => void;
  canFormat: boolean;
  canCopy: boolean;
}

interface ToolbarButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function ToolbarButton({ icon, label, onClick, disabled }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      className="btn btn--icon btn--sm"
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      <span className="btn__icon">{icon}</span>
      <span className="btn__label">{label}</span>
    </button>
  );
}

export function Toolbar({
  onPaste,
  onCopy,
  onFormat,
  onRemoveWhitespace,
  onClear,
  onFileLoad,
  onAbout,
  canFormat,
  canCopy,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onFileLoad(reader.result);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="toolbar">
      <ToolbarButton icon={<PasteIcon />} label="Paste" onClick={onPaste} />
      <ToolbarButton icon={<CopyIcon />} label="Copy" onClick={onCopy} disabled={!canCopy} />
      <ToolbarButton icon={<FormatIcon />} label="Format" onClick={onFormat} disabled={!canFormat} />
      <ToolbarButton
        icon={<CompressIcon />}
        label="Remove white space"
        onClick={onRemoveWhitespace}
        disabled={!canFormat}
      />
      <ToolbarButton icon={<ClearIcon />} label="Clear" onClick={onClear} />
      <ToolbarButton
        icon={<UploadIcon />}
        label="Load JSON data"
        onClick={() => fileInputRef.current?.click()}
      />
      <div className="toolbar__spacer" />
      <button type="button" className="btn btn--sm about-btn" onClick={onAbout} title="About">
        About
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json,text/plain"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
}
