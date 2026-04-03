import type { WeatherData } from "../../../types";
import { styles } from "../styles/weatherStyles";
import { formatTemp } from "../../../utils/formatTemps";

interface Props {
  data: WeatherData;
  onSave: () => void;
  onViewAdvanced: () => void;
}

export const WeatherResult: React.FC<Props> = ({
  data,
  onSave,
  onViewAdvanced,
}) => (
  <div style={styles.resultCard}>
    <h3 style={{ marginTop: 0 }}>
      Result for {data.city} ({data.country_code})
    </h3>
    <p>
      <strong>Temperature:</strong>{" "}
      <span style={{ color: "#4facf7" }}>{formatTemp(data.temp)}</span>
    </p>
    <p>
      <strong>Humidity:</strong> {data.humidity}% | <strong>Pressure:</strong>{" "}
      {data.pressure} hPa
    </p>
    <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
      <button onClick={onSave} style={styles.buttonOutline}>
        Save Essential
      </button>
      <button
        onClick={onViewAdvanced}
        style={{
          ...styles.buttonOutline,
          background: "#2c3e50",
          borderColor: "#34495e",
        }}
      >
        🔍 View Advanced Report
      </button>
    </div>
  </div>
);
