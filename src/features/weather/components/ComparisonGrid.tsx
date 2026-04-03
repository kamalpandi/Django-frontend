import type { WeatherData } from "../../../types";
import { styles } from "../styles/weatherStyles";
import { formatTemp } from "../../../utils/formatTemps";

interface Props {
  data: WeatherData[];
  onSave: (data: WeatherData) => void;
}

export const ComparisonGrid: React.FC<Props> = ({ data, onSave }) => (
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
                {formatTemp(item.temp)}
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
