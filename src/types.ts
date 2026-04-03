export interface PreviewItem {
  key: string;
  type: string;
  isExpandable: boolean;
}

export interface Summary {
  type: string;
  count: number;
  preview: PreviewItem[];
}

export interface PreviewItem {
  key: string;
  type: string;
  isExpandable: boolean;
  value?: string;
}

export interface WeatherData {
  city: string;
  country_code?: string;
  coordinate?: string;
  temp?: string;
  pressure?: number | string;
  humidity?: number | string;
  description?: string;
  error?: string;
}

export interface FullWeatherData {
  city_name: string;
  country: string;
  sys: { country: string; sunrise: number; sunset: number };
  coord: { lon: number; lat: number };
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  wind: { speed: number; deg: number };
  clouds: { all: number };
  visibility: number;
  dt: number;
}