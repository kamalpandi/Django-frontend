import type { TodoItem } from "../types";
import { styles } from "../styles/todoStyles";

interface Props {
  todos: TodoItem[];
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onDelete }) => {
  if (todos.length === 0)
    return <p style={{ color: "#888" }}>No tasks yet. Add one!</p>;

  return (
    <div style={styles.list}>
      {todos.map((todo) => (
        <div key={todo.id} style={styles.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0", color: "#fff" }}>{todo.title}</h4>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={styles.dateBadge}>
                {new Date(todo.date).toLocaleDateString()}
              </span>
              <button
                onClick={() => onDelete(todo.id)}
                style={styles.deleteBtn}
                title="Delete task"
              >
                ✕
              </button>
            </div>
          </div>
          {todo.details && (
            <p style={{ margin: 0, color: "#aaa", fontSize: "0.9rem" }}>
              {todo.details}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
