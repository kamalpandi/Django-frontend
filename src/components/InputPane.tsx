import { useRef } from 'react';

interface InputPaneProps {
  jsonInput: string;
  setJsonInput: (val: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  onLoadData: (data: unknown) => void;
  error: string | null;
}

// Limit text display to 2MB to prevent browser crash
const DISPLAY_LIMIT = 2 * 1024 * 1024; 

export const InputPane = ({ jsonInput, setJsonInput, onAnalyze, onClear, onLoadData, error }: InputPaneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;

      // 1. SAFETY CHECK: Is the file too big to display?
      if (text.length > DISPLAY_LIMIT) {
        // If huge, show a placeholder message instead of the raw text
        const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
        setJsonInput(`[LARGE FILE DETECTED: ${sizeInMb} MB]\n\nRaw text is hidden to prevent browser crash.\nAnalysis is ready on the right pane.`);
      } else {
        // If small, show the text as normal
        setJsonInput(text);
      }

      // 2. Parse the data regardless of display
      try {
        const parsed = JSON.parse(text);
        onLoadData(parsed);
      } catch (err) {
        console.error("File error", err);
        // We can optionally trigger an error state here via a callback if needed
      }
    };

    reader.readAsText(file);
    
    // Reset the input so you can re-upload the same file if needed
    event.target.value = '';
  };

  return (
    <div className="input-pane">
      <h1 className="app-title">JSON X-Ray</h1>
      
      <textarea
        className="json-textarea"
        placeholder='Paste JSON or Upload File...'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        spellCheck={false}
      />
      
      {error && <div className="error-box">{error}</div>}
      
      <div className="button-group">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".json"
          onChange={handleFileUpload}
        />
        <button className="btn-upload" onClick={() => fileInputRef.current?.click()}>
          Upload JSON
        </button>
        <button onClick={onAnalyze}>Scan Text</button>
        <button className="btn-clear" onClick={onClear}>Clear</button>
      </div>
    </div>
  );
};