// src/hooks/useJsonExplorer.ts
import { useState } from 'react';
import { generateOverview } from '../utils/jsonHelpers';

export const useJsonExplorer = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<unknown>(null);
  const [currentView, setCurrentView] = useState<unknown>(null);
  const [path, setPath] = useState<string[]>(['Root']);

  const handleAnalyze = () => {
    if (!jsonInput.trim()) {
      resetAll();
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      loadJsonData(parsed);
      setError(null);
    } catch (err) {
      setError("Invalid JSON format. Please check syntax.");
      setParsedData(null);
      setCurrentView(null);
    }
  };

  const loadJsonData = (data: unknown) => {
    setParsedData(data);
    setCurrentView(data);
    setPath(['Root']);
    setError(null);
  };

  const resetAll = () => {
    setJsonInput('');
    setParsedData(null);
    setCurrentView(null);
    setError(null);
    setPath(['Root']);
  };

  const handleCardClick = (key: string) => {
    if (typeof currentView === 'object' && currentView !== null) {
      const childData = (currentView as Record<string, unknown>)[key];
      if (childData && typeof childData === 'object') {
        setCurrentView(childData);
        setPath([...path, key]);
      }
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      setCurrentView(parsedData);
      setPath(['Root']);
      return;
    }
    let newData = parsedData;
    const newPath = path.slice(0, index + 1);
    for (let i = 1; i < newPath.length; i++) {
      if (newData && typeof newData === 'object') {
        newData = (newData as Record<string, unknown>)[newPath[i]];
      }
    }
    setCurrentView(newData);
    setPath(newPath);
  };

  // Derived state
  const summary = currentView ? generateOverview(currentView) : null;

  return {
    jsonInput,
    setJsonInput,
    error,
    setError,
    path,
    summary,
    parsedData, // Exposed if needed for checking if data exists
    handleAnalyze,
    handleCardClick,
    handleBreadcrumbClick,
    resetAll,
    loadJsonData // Exposed for the file uploader
  };
};