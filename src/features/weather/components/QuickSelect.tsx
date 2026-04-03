import { styles } from "../styles/weatherStyles";

interface Props {
  cities: string[];
  onSelect: (city: string) => void;
  loading: boolean;
}

export const QuickSelect: React.FC<Props> = ({ cities, onSelect, loading }) => {
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
