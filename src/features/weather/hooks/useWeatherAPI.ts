import { useState, useEffect } from "react";
import type { WeatherData } from "../../../types";

const API_BASE_URL = "https://vibi.pythonanywhere.com";

export const useWeatherAPI = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [comparisonData, setComparisonData] = useState<WeatherData[]>([]);
  const [savedReports, setSavedReports] = useState<WeatherData[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAvailableCities = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/weather/get_cities/`);
      if (res.ok) {
        const data = await res.json();
        setAvailableCities(Array.isArray(data) ? data : data.cities || []);
      }
    } catch (err) {
      console.error("Failed to fetch cities", err);
    }
  };

  const fetchSavedReports = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/weather/get_essential_reports/`);
      if (res.ok) setSavedReports(await res.json());
    } catch (err) {
      console.error("Failed to fetch saved reports", err);
    }
  };

  useEffect(() => {
    fetchSavedReports();
    fetchAvailableCities();
  }, []);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");
    setComparisonData([]);
    try {
      const res = await fetch(`${API_BASE_URL}/weather/one_city/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      setWeatherData({ ...data, city });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchComparison = async (cities: string[]) => {
    setLoading(true);
    setError("");
    setWeatherData(null);
    try {
      const res = await fetch(`${API_BASE_URL}/weather/weather_for_cities/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cities }),
      });
      if (!res.ok) throw new Error("Failed to fetch comparison data");
      setComparisonData(await res.json());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const saveReport = async (dataToSave: WeatherData = weatherData!) => {
    if (!dataToSave?.temp) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/weather/save_essential_report/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSave),
        },
      );
      if (!res.ok) throw new Error("Failed to save report");
      alert(`Weather report for ${dataToSave.city} saved!`);
      await fetchSavedReports();
    } catch (err) {
      console.error(err);
      alert("Error saving report.");
    }
  };

  return {
    weatherData,
    comparisonData,
    savedReports,
    availableCities,
    loading,
    error,
    fetchWeather,
    fetchComparison,
    saveReport,
    clearResults: () => {
      setWeatherData(null);
      setComparisonData([]);
      setError("");
    },
  };
};
