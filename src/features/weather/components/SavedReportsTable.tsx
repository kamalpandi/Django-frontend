import type { WeatherData } from "../../../types";
import { styles } from "../styles/weatherStyles";
import { formatTemp } from "../../../utils/formatTemps";

export const SavedReportsTable: React.FC<{ reports: WeatherData[] }> = ({
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
        {reports.map((report, idx) => (
          <tr key={idx} style={styles.tableRow}>
            <td style={styles.td}>{report.country_code}</td>
            <td style={styles.td}>{formatTemp(report.temp)}</td>
            <td style={styles.td}>{report.humidity}%</td>
            <td style={styles.td}>{report.pressure}</td>
            <td style={styles.td}>{report.coordinate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
