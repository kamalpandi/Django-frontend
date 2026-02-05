// src/utils/jsonHelpers.ts
import type { Summary } from '../types';

export const getTypeClass = (typeString: string): string => {
  if (typeString.includes('Array')) return 'badge-array';
  if (typeString === 'Object') return 'badge-object';
  if (typeString === 'number') return 'badge-number';
  if (typeString === 'string') return 'badge-string';
  if (typeString === 'boolean') return 'badge-boolean';
  if (typeString === 'null') return 'badge-null';
  return 'badge-default';
};

export const generateOverview = (data: unknown): Summary => {
  if (data === null) return { type: 'null', count: 0, preview: [] };

  // Safety check: only process if it's an object or array
  const keys = (typeof data === 'object') ? Object.keys(data as object) : [];

  const preview = keys.map((key) => {
    const rawValue = (data as Record<string, unknown>)[key];
    let valueType: string = typeof rawValue;
    let isExpandable = false;
    let displayValue = "";

    if (Array.isArray(rawValue)) {
      valueType = `Array (${rawValue.length})`;
      isExpandable = rawValue.length > 0;
    } else if (rawValue === null) {
      valueType = 'null';
      displayValue = "null";
    } else if (valueType === 'object') {
      valueType = 'Object';
      isExpandable = Object.keys(rawValue as object).length > 0;
    } else {
      // Primitive handling
      displayValue = String(rawValue);
      if (displayValue.length > 40) displayValue = displayValue.substring(0, 37) + "...";
    }

    return { 
      key, 
      type: valueType, 
      isExpandable, 
      value: displayValue 
    };
  });

  return {
    type: Array.isArray(data) ? 'Array' : 'Object',
    count: keys.length,
    preview
  };
};