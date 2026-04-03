export const formatTemp = (tempStr: string | number | undefined): string => {
  if (!tempStr) return "N/A";
  const str = String(tempStr);
  return str.includes(".") ? `${parseFloat(str).toFixed(1)}°C` : `${str}°C`;
};

export const kelvinToCelsius = (k: number): string =>
  `${(k - 273.15).toFixed(1)}°C`;

export const formatTime = (unix: number): string =>
  new Date(unix * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
