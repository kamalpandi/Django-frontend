import { useState, useEffect } from "react";
import type { TodoItem } from "../types";
import config from "../../../config";

const API_BASE_URL = config.API_BASE_URL;

export const useTodo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/todo/get_todos/`);
      if (!res.ok) throw new Error("Failed to fetch todos");
      setTodos(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (title: string, details: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/todo/create_todo/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          details,
          date: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed to create todo");
      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/todo/delete_todo/${id}/`, {
        method: "DELETE",
      });
      if (res.status === 403) {
        const data = await res.json();
        setError(data.message);
        return;
      }
      if (!res.ok) throw new Error("Failed to delete");
      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, error, createTodo, deleteTodo };
};
