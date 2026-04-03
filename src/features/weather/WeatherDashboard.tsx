import React from "react";
import { useWeatherAPI } from "./hooks/useWeatherAPI";
import { WeatherForm } from "./components/WeatherForm";
import { QuickSelect } from "./components/QuickSelect";
import { WeatherResult } from "./components/WeatherResult";
import { ComparisonGrid } from "./components/ComparisonGrid";
import { FullWeatherResult } from "./components/FullWeatherResult";
import { SavedReportsTable } from "./components/SavedReportsTable";
import { styles } from "./styles/weatherStyles";

export const WeatherDashboard: React.FC = () => {
  const {
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
        {(weatherData || comparisonData.length > 0 || fullWeatherData) && (
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

      {comparisonData.length > 0 && !error && (
        <ComparisonGrid data={comparisonData} onSave={saveReport} />
      )}

      {fullWeatherData && !error && (
        <FullWeatherResult data={fullWeatherData} onSave={saveFullReport} />
      )}

      {weatherData && !error && (
        <WeatherResult
          data={weatherData}
          onSave={() => saveReport()}
          onViewAdvanced={() => fetchFullWeather(weatherData.city)} // NEW
        />
      )}

      <SavedReportsTable
        savedReports={savedReports}
        savedFullReports={savedFullReports}
      />
    </div>
  );
};
