import React, { useState, useEffect } from "react";
import type { SyntheticEvent } from "react";

export interface WeatherData {
  city: string;
  country_code?: string;
  coordinate?: string;
  temp?: string;
  pressure?: number | string;
  humidity?: number | string;
  description?: string; // Added for the multi-city endpoint
  error?: string; // Added to handle API failures for specific cities
}

// ==========================================
// CUSTOM HOOK
// ==========================================
const useWeatherAPI = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [comparisonData, setComparisonData] = useState<WeatherData[]>([]); // NEW STATE
  const [savedReports, setSavedReports] = useState<WeatherData[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const API_BASE_URL = "http://127.0.0.1:8000";

  const fetchAvailableCities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/get_cities`);
      if (response.ok) {
        const data = await response.json();
        const citiesArray = Array.isArray(data) ? data : data.cities || [];
        setAvailableCities(citiesArray);
      }
    } catch (err) {
      console.error("Failed to fetch available cities", err);
    }
  };

  const fetchSavedReports = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/weather/get_essential_reports`,
      );
      if (response.ok) {
        const data = await response.json();
        setSavedReports(data);
      }
    } catch (err) {
      console.error("Failed to fetch saved reports", err);
    }
  };

  useEffect(() => {
    fetchSavedReports();
    fetchAvailableCities();
  }, []);

  // SINGLE CITY FETCH
  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");
    setComparisonData([]); // Clear any comparison view

    try {
      const response = await fetch(`${API_BASE_URL}/weather/one_city`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) throw new Error("Failed to fetch weather");

      const data = await response.json();
      setWeatherData({ ...data, city });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  // NEW: MULTI-CITY FETCH
  const fetchComparison = async (cities: string[]) => {
    setLoading(true);
    setError("");
    setWeatherData(null); // Clear single view

    try {
      const response = await fetch(
        `${API_BASE_URL}/weather/weather_for_cities`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cities }),
        },
      );

      if (!response.ok) throw new Error("Failed to fetch comparison data");

      const data = await response.json();
      setComparisonData(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const saveReport = async (dataToSave: WeatherData = weatherData!) => {
    if (!dataToSave || !dataToSave.temp) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/weather/save_essential_report`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSave),
        },
      );

      if (response.ok) {
        alert(`Weather report for ${dataToSave.city} saved!`);
        await fetchSavedReports();
      } else {
        throw new Error("Failed to save report");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving report.");
    }
  };

  return {
    weatherData,
    comparisonData, // Exported
    savedReports,
    availableCities,
    loading,
    error,
    fetchWeather,
    fetchComparison, // Exported
    saveReport,
    clearResults: () => {
      setWeatherData(null);
      setComparisonData([]);
      setError("");
    }, // Helper to reset UI
  };
};

// ==========================================
// SUB-COMPONENTS
// ==========================================

const WeatherForm: React.FC<{
  onSearch: (city: string) => void;
  onCompare: (cities: string[]) => void;
  loading: boolean;
}> = ({ onSearch, onCompare, loading }) => {
  const [inputVal, setInputVal] = useState<string>("");

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    // NEW: Smart routing based on comma presence
    if (inputVal.includes(",")) {
      const citiesArray = inputVal
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c);
      onCompare(citiesArray);
    } else {
      onSearch(inputVal.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "15px" }}>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        placeholder="City (e.g., London) OR Compare (London, Paris)"
        style={{ ...styles.input, width: "320px" }} // Made slightly wider for commas
        required
      />
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Searching..." : "Get Weather"}
      </button>
    </form>
  );
};

// NEW: Comparison Grid Component
const ComparisonGrid: React.FC<{
  data: WeatherData[];
  onSave: (data: WeatherData) => void;
}> = ({ data, onSave }) => (
  <div style={{ marginBottom: "30px" }}>
    <h3 style={{ marginTop: 0 }}>Comparison Results</h3>
    <div style={styles.gridContainer}>
      {data.map((item, idx) => (
        <div key={idx} style={styles.gridCard}>
          <h4
            style={{
              margin: "0 0 10px 0",
              color: "#fff",
              borderBottom: "1px solid #444",
              paddingBottom: "5px",
            }}
          >
            {item.city} {item.country_code ? `(${item.country_code})` : ""}
          </h4>

          {item.error ? (
            <p style={{ color: "#ff6b6b", fontSize: "0.9rem" }}>{item.error}</p>
          ) : (
            <>
              <h2 style={{ margin: "10px 0", color: "#4facf7" }}>
                {typeof item.temp === "string" && item.temp.includes(".")
                  ? `${parseFloat(item.temp).toFixed(1)}°C`
                  : item.temp}
              </h2>
              <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#ccc" }}>
                {item.description || "N/A"}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.85rem",
                  color: "#aaa",
                  marginTop: "15px",
                }}
              >
                <span>💧 {item.humidity}%</span>
                <span>⏲️ {item.pressure} hPa</span>
              </div>
              <button
                onClick={() => onSave(item)}
                style={{
                  ...styles.buttonOutline,
                  width: "100%",
                  marginTop: "15px",
                  fontSize: "0.85rem",
                }}
              >
                Save Report
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Existing QuickSelect, WeatherResult, and SavedReportsTable remain unchanged
const QuickSelect: React.FC<{
  cities: string[];
  onSelect: (city: string) => void;
  loading: boolean;
}> = ({ cities, onSelect, loading }) => {
  if (cities.length === 0) return null;
  return (
    <div style={styles.quickSelectContainer}>
      <span style={{ fontSize: "0.9rem", color: "#888", marginRight: "10px" }}>
        Quick Select:
      </span>
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          disabled={loading}
          style={styles.quickSelectButton}
        >
          {city}
        </button>
      ))}
    </div>
  );
};

const WeatherResult: React.FC<{ data: WeatherData; onSave: () => void }> = ({
  data,
  onSave,
}) => {
  const formattedTemp =
    typeof data.temp === "string" && data.temp.includes(".")
      ? `${parseFloat(data.temp).toFixed(1)}°C`
      : data.temp;
  return (
    <div style={styles.resultCard}>
      <h3 style={{ marginTop: 0 }}>
        Result for {data.city} ({data.country_code})
      </h3>
      <p>
        <strong>Temperature:</strong>{" "}
        <span style={{ color: "#4facf7" }}>{formattedTemp}</span>
      </p>
      <p>
        <strong>Humidity:</strong> {data.humidity}%
      </p>
      <p>
        <strong>Pressure:</strong> {data.pressure} hPa
      </p>
      <p>
        <strong>Coordinates:</strong> {data.coordinate}
      </p>
      <button onClick={onSave} style={styles.buttonOutline}>
        Save to Database
      </button>
    </div>
  );
};

const SavedReportsTable: React.FC<{ reports: WeatherData[] }> = ({
  reports,
}) => {
  if (reports.length === 0)
    return <p style={{ color: "#888" }}>No reports saved yet.</p>;
  return (
    <table style={styles.table}>
      <thead>
        <tr style={styles.tableHeaderRow}>
          <th style={styles.th}>Country</th>
          <th style={styles.th}>Temp</th>
          <th style={styles.th}>Humidity</th>
          <th style={styles.th}>Pressure</th>
          <th style={styles.th}>Coordinates</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, idx) => {
          const formattedTemp =
            typeof report.temp === "string" && report.temp.includes(".")
              ? `${parseFloat(report.temp).toFixed(1)}°C`
              : report.temp;
          return (
            <tr key={idx} style={styles.tableRow}>
              <td style={styles.td}>{report.country_code}</td>
              <td style={styles.td}>{formattedTemp}</td>
              <td style={styles.td}>{report.humidity}%</td>
              <td style={styles.td}>{report.pressure}</td>
              <td style={styles.td}>{report.coordinate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export const WeatherDashboard: React.FC = () => {
  const {
    weatherData,
    comparisonData,
    savedReports,
    availableCities,
    loading,
    error,
    fetchWeather,
    fetchComparison,
    saveReport,
    clearResults,
  } = useWeatherAPI();

  return (
    <div style={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#fff" }}>Weather API Tool</h2>
        {/* Handy clear button to reset the view */}
        {(weatherData || comparisonData.length > 0) && (
          <button onClick={clearResults} style={styles.clearButton}>
            Clear Results
          </button>
        )}
      </div>

      <WeatherForm
        onSearch={fetchWeather}
        onCompare={fetchComparison}
        loading={loading}
      />
      <QuickSelect
        cities={availableCities}
        onSelect={fetchWeather}
        loading={loading}
      />

      {error && <div style={styles.error}>{error}</div>}

      {/* RENDER SINGLE OR COMPARISON VIEW */}
      {weatherData && !error && (
        <WeatherResult data={weatherData} onSave={() => saveReport()} />
      )}
      {comparisonData.length > 0 && !error && (
        <ComparisonGrid
          data={comparisonData}
          onSave={(item) => saveReport(item)}
        />
      )}

      <div style={{ marginTop: "40px" }}>
        <h3
          style={{
            color: "#fff",
            borderBottom: "1px solid #333",
            paddingBottom: "10px",
          }}
        >
          Saved Essential Reports
        </h3>
        <SavedReportsTable reports={savedReports} />
      </div>
    </div>
  );
};

// ==========================================
// STYLES
// ==========================================
const styles: Record<string, React.CSSProperties> = {
  container: { padding: "20px", width: "100%", color: "#eee" },
  input: {
    padding: "10px",
    marginRight: "10px",
    background: "#222",
    border: "1px solid #444",
    color: "#fff",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
    background: "#333",
    color: "#fff",
    border: "1px solid #555",
    borderRadius: "4px",
  },
  buttonOutline: {
    padding: "8px 16px",
    cursor: "pointer",
    background: "transparent",
    color: "#fff",
    border: "1px solid #777",
    borderRadius: "4px",
    transition: "0.2s",
  },
  clearButton: {
    padding: "6px 12px",
    cursor: "pointer",
    background: "transparent",
    color: "#ff6b6b",
    border: "1px solid #ff6b6b",
    borderRadius: "4px",
    fontSize: "0.85rem",
  },
  error: {
    color: "#ff6b6b",
    marginBottom: "20px",
    padding: "10px",
    background: "rgba(255, 0, 0, 0.1)",
    borderRadius: "4px",
  },
  resultCard: {
    border: "1px solid #444",
    padding: "20px",
    marginBottom: "30px",
    borderRadius: "8px",
    background: "#1a1a1a",
  },
  table: { width: "100%", textAlign: "left", borderCollapse: "collapse" },
  tableHeaderRow: { borderBottom: "2px solid #555" },
  tableRow: { borderBottom: "1px solid #333" },
  th: { padding: "12px 8px", color: "#bbb" },
  td: { padding: "12px 8px" },
  quickSelectContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "25px",
  },
  quickSelectButton: {
    padding: "4px 12px",
    fontSize: "0.85rem",
    background: "transparent",
    color: "#aaa",
    border: "1px solid #444",
    borderRadius: "16px",
    cursor: "pointer",
  },

  // NEW GRID STYLES
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  gridCard: {
    border: "1px solid #444",
    padding: "15px",
    borderRadius: "8px",
    background: "#1e1e1e",
    display: "flex",
    flexDirection: "column",
  },
};
