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
