import type { WeatherData } from "../../../types";
import { styles } from "../styles/weatherStyles";
import { formatTemp } from "../../../utils/formatTemps";

interface Props {
  data: WeatherData;
  onSave: () => void;
}

export const WeatherResult: React.FC<Props> = ({ data, onSave }) => (
  <div style={styles.resultCard}>
    <h3 style={{ marginTop: 0 }}>
      Result for {data.city} ({data.country_code})
    </h3>
    <p>
      <strong>Temperature:</strong>{" "}
      <span style={{ color: "#4facf7" }}>{formatTemp(data.temp)}</span>
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
