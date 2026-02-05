// src/components/ResultsPane.tsx
import type { Summary, PreviewItem } from '../types';
import { getTypeClass } from '../utils/jsonHelpers';

interface ResultsPaneProps {
  summary: Summary | null;
  path: string[];
  onBreadcrumbClick: (index: number) => void;
  onCardClick: (key: string) => void;
  hasData: boolean;
}

export const ResultsPane = ({ summary, path, onBreadcrumbClick, onCardClick, hasData }: ResultsPaneProps) => {
  if (!hasData || !summary) {
    return (
      <div className="output-pane">
        <div className="placeholder-text">
          <h2>Ready to scan</h2>
          <p>Upload a file or paste text to begin.</p>
        </div>
      </div>
    );
  }

  // Helper moved inside or outside to handle logic
  const handleCardInteraction = (item: PreviewItem) => {
    if (item.isExpandable) {
      onCardClick(item.key);
    }
  };

  return (
    <div className="output-pane">
      <div className="breadcrumb-bar">
        {path.map((item, index) => (
          <div key={index} className="breadcrumb-pill-wrapper">
            <button
              className="breadcrumb-pill"
              onClick={() => onBreadcrumbClick(index)}
              title={`Back to ${item}`}
            >
              {item}
            </button>
            {index < path.length - 1 && (
              <span className="breadcrumb-arrow">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="results-header">
        <h3>{summary.type} Overview</h3>
        <span className="item-count">{summary.count} properties</span>
      </div>

      <div className="results-grid">
        {summary.preview.map((item, index) => (
          <div
            key={index}
            className={`result-card ${item.isExpandable ? 'clickable' : ''}`}
            onClick={() => handleCardInteraction(item)}
          >
            <div className="card-top">
              <span className="result-key">{item.key}</span>
              {item.isExpandable && <span className="expand-icon">▶</span>}
            </div>

            {/* Display value for non-expandable items */}
            {!item.isExpandable && item.value !== undefined && (
              <div className="value-preview">
                {item.value}
              </div>
            )}

            <div className="card-bottom">
              <span className={`type-badge ${getTypeClass(item.type)}`}>
                {item.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};