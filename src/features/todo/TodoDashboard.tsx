import React from "react";
import { useTodo } from "./hooks/useTodo";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { styles } from "./styles/todoStyles";

export const TodoDashboard: React.FC = () => {
  const { todos, loading, error, createTodo, deleteTodo } = useTodo();

  return (
    <div style={styles.container}>
      <h2 style={{ color: "#fff", marginBottom: "24px" }}>Todo List</h2>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.layout}>
        <TodoForm onCreate={createTodo} loading={loading} />
        <TodoList todos={todos} onDelete={deleteTodo} />
      </div>
    </div>
  );
};
