import { useState } from "react";
import type { SyntheticEvent } from "react";
import { styles } from "../styles/weatherStyles";

interface Props {
  onSearch: (city: string) => void;
  onCompare: (cities: string[]) => void;
  loading: boolean;
}

export const WeatherForm: React.FC<Props> = ({
  onSearch,
  onCompare,
  loading,
}) => {
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    if (inputVal.includes(",")) {
      onCompare(
        inputVal
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
      );
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
        style={styles.input}
        required
      />
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Searching..." : "Get Weather"}
      </button>
    </form>
  );
};
