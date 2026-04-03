import { useState } from "react";
import { styles } from "../styles/todoStyles";

interface Props {
  onCreate: (title: string, details: string) => void;
  loading: boolean;
}

export const TodoForm: React.FC<Props> = ({ onCreate, loading }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title.trim(), details.trim());
    setTitle("");
    setDetails("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={{ marginTop: 0, color: "#fff" }}>New Task</h3>

      <label style={styles.label}>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        style={styles.input}
        required
      />

      <label style={styles.label}>Details</label>
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Any extra notes..."
        style={styles.textarea}
      />

      <label style={styles.label}>Date</label>
      <input
        type="text"
        value={new Date().toLocaleString()}
        readOnly
        style={{ ...styles.input, color: "#888", cursor: "not-allowed" }}
      />

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};
