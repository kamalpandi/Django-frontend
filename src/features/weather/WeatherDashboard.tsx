import React from "react";
import { useWeatherAPI } from "./hooks/useWeatherAPI";
import { WeatherForm } from "./components/WeatherForm";
import { QuickSelect } from "./components/QuickSelect";
import { WeatherResult } from "./components/WeatherResult";
import { ComparisonGrid } from "./components/ComparisonGrid";
import { SavedReportsTable } from "./components/SavedReportsTable";
import { styles } from "./styles/weatherStyles";

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

      {weatherData && !error && (
        <WeatherResult data={weatherData} onSave={() => saveReport()} />
      )}
      {comparisonData.length > 0 && !error && (
        <ComparisonGrid data={comparisonData} onSave={saveReport} />
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
