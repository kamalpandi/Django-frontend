import { useState } from "react";
import type { WeatherData, FullWeatherData } from "../../../types";
import { styles } from "../styles/weatherStyles";
import { formatTemp, kelvinToCelsius } from "../../../utils/weatherHelpers";

interface Props {
  savedReports: WeatherData[];
  savedFullReports: FullWeatherData[];
}

export const SavedReportsTable: React.FC<Props> = ({
  savedReports,
  savedFullReports,
}) => {
  const [activeTab, setActiveTab] = useState<"essential" | "advanced">(
    "essential",
  );

  return (
    <div style={{ marginTop: "50px" }}>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #333",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={() => setActiveTab("essential")}
          style={{
            ...styles.tabBtn,
            borderBottom:
              activeTab === "essential" ? "2px solid #4facf7" : "none",
            color: activeTab === "essential" ? "#fff" : "#888",
          }}
        >
          Essential Reports ({savedReports.length})
        </button>
        <button
          onClick={() => setActiveTab("advanced")}
          style={{
            ...styles.tabBtn,
            borderBottom:
              activeTab === "advanced" ? "2px solid #4facf7" : "none",
            color: activeTab === "advanced" ? "#fff" : "#888",
          }}
        >
          Advanced Reports ({savedFullReports.length})
        </button>
      </div>

      {activeTab === "essential" ? (
        savedReports.length === 0 ? (
          <p style={{ color: "#888" }}>No essential reports saved.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Country</th>
                <th style={styles.th}>Temp</th>
                <th style={styles.th}>Humidity</th>
                <th style={styles.th}>Pressure</th>
              </tr>
            </thead>
            <tbody>
              {savedReports.map((r, i) => (
                <tr key={i} style={styles.tableRow}>
                  <td style={styles.td}>{r.country_code}</td>
                  <td style={styles.td}>{formatTemp(r.temp)}</td>
                  <td style={styles.td}>{r.humidity}%</td>
                  <td style={styles.td}>{r.pressure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : savedFullReports.length === 0 ? (
        <p style={{ color: "#888" }}>No advanced reports saved.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Temp</th>
              <th style={styles.th}>Wind</th>
              <th style={styles.th}>Clouds</th>
              <th style={styles.th}>Conditions</th>
            </tr>
          </thead>
          <tbody>
            {savedFullReports.map((r, i) => (
              <tr key={i} style={styles.tableRow}>
                <td style={styles.td}>{r.name}</td>
                <td style={styles.td}>{kelvinToCelsius(r.main.temp)}</td>
                <td style={styles.td}>{r.wind.speed} m/s</td>
                <td style={styles.td}>{r.clouds.all}%</td>
                <td style={styles.td}>{r.weather[0]?.main}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
