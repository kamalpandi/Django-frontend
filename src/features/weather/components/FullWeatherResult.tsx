import type { FullWeatherData } from "../../../types";
import { kelvinToCelsius, formatTime } from "../../../utils/weatherHelpers";
import { styles } from "../styles/weatherStyles";

interface Props {
  data: FullWeatherData;
  onSave: () => void;
}

export const FullWeatherResult: React.FC<Props> = ({ data, onSave }) => (
  <div style={{ ...styles.resultCard, borderColor: "#4facf7" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottom: "1px solid #333",
        paddingBottom: "15px",
        marginBottom: "15px",
      }}
    >
      <div>
        <h2 style={{ marginTop: 0, marginBottom: "5px", color: "#fff" }}>
          {data.city_name} ({data.sys.country})
        </h2>
        <span style={{ color: "#aaa", textTransform: "capitalize" }}>
          {data.weather[0]?.description}
        </span>
      </div>
      <h1 style={{ margin: 0, color: "#4facf7", fontSize: "2.5rem" }}>
        {kelvinToCelsius(data.main.temp)}
      </h1>
    </div>

    <div style={styles.statsGrid}>
      <div style={styles.statBox}>
        <strong>Feels Like</strong>
        <br />
        {kelvinToCelsius(data.main.feels_like)}
      </div>
      <div style={styles.statBox}>
        <strong>Wind</strong>
        <br />
        {data.wind.speed} m/s
      </div>
      <div style={styles.statBox}>
        <strong>Humidity</strong>
        <br />
        {data.main.humidity}%
      </div>
      <div style={styles.statBox}>
        <strong>Pressure</strong>
        <br />
        {data.main.pressure} hPa
      </div>
      <div style={styles.statBox}>
        <strong>Visibility</strong>
        <br />
        {(data.visibility / 1000).toFixed(1)} km
      </div>
      <div style={styles.statBox}>
        <strong>Clouds</strong>
        <br />
        {data.clouds.all}%
      </div>
      <div style={styles.statBox}>
        <strong>Sunrise</strong>
        <br />
        {formatTime(data.sys.sunrise)}
      </div>
      <div style={styles.statBox}>
        <strong>Sunset</strong>
        <br />
        {formatTime(data.sys.sunset)}
      </div>
    </div>

    <button
      onClick={onSave}
      style={{
        ...styles.buttonOutline,
        borderColor: "#4facf7",
        color: "#4facf7",
      }}
    >
      Save Advanced Report
    </button>
  </div>
);
