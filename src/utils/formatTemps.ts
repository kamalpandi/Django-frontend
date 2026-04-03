export const formatTemp = (temp?: string): string => {
  if (!temp) return "N/A";
  return temp.includes(".") ? `${parseFloat(temp).toFixed(1)}°C` : temp;
};
