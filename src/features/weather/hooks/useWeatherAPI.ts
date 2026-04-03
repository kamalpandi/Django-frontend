import { useState, useEffect } from "react";
import type { WeatherData, FullWeatherData } from "../../../types";

const API_BASE_URL = "https://vibi.pythonanywhere.com";

export const useWeatherAPI = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [comparisonData, setComparisonData] = useState<WeatherData[]>([]);
  const [fullWeatherData, setFullWeatherData] =
    useState<FullWeatherData | null>(null); // NEW
  const [savedReports, setSavedReports] = useState<WeatherData[]>([]);
  const [savedFullReports, setSavedFullReports] = useState<FullWeatherData[]>(
    [],
  ); // NEW
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
      console.error(err);
    }
  };

  const fetchSavedReports = async () => {
    try {
      const resEss = await fetch(
        `${API_BASE_URL}/weather/get_essential_reports/`,
      );
      if (resEss.ok) setSavedReports(await resEss.json());

      const resFull = await fetch(`${API_BASE_URL}/weather/get_full_report/`);
      if (resFull.ok) setSavedFullReports(await resFull.json());
    } catch (err) {
      console.error(err);
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
    setFullWeatherData(null);
    try {
      const res = await fetch(`${API_BASE_URL}/weather/one_city/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });
      if (!res.ok) throw new Error("Failed to fetch weather");
      setWeatherData({ ...(await res.json()), city });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const fetchComparison = async (cities: string[]) => {
    setLoading(true);
    setError("");
    setWeatherData(null);
    setFullWeatherData(null);
    try {
      const res = await fetch(`${API_BASE_URL}/weather/weather_for_cities/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cities }),
      });
      if (!res.ok) throw new Error("Failed to fetch comparison");
      setComparisonData(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  // NEW
  const fetchFullWeather = async (city: string) => {
    setLoading(true);
    setError("");
    setWeatherData(null);
    setComparisonData([]);
    try {
      const res = await fetch(`${API_BASE_URL}/weather/full_report/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });
      if (!res.ok) throw new Error("Failed to fetch full report");
      setFullWeatherData(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
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
      if (!res.ok) throw new Error("Failed to save");
      alert(`Essential report for ${dataToSave.city} saved!`);
      await fetchSavedReports();
    } catch (err) {
      console.log(err);
      alert("Error saving report.");
    }
  };

  // NEW
  const saveFullReport = async () => {
    if (!fullWeatherData) return;
    try {
      const res = await fetch(`${API_BASE_URL}/weather/save_full_report/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullWeatherData),
      });
      if (!res.ok) throw new Error("Failed to save full report");
      alert(`Advanced report for ${fullWeatherData.city_name} saved!`);
      await fetchSavedReports();
    } catch (err) {
      alert("Error saving full report.");
      console.log(err);
    }
  };

  return {
    weatherData,
    comparisonData,
    fullWeatherData,
    savedReports,
    savedFullReports,
    availableCities,
    loading,
    error,
    fetchWeather,
    fetchComparison,
    fetchFullWeather,
    saveReport,
    saveFullReport,
    clearResults: () => {
      setWeatherData(null);
      setComparisonData([]);
      setFullWeatherData(null);
      setError("");
    },
  };
};
