"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllTasks } from "../services/task";
export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "To-Do" | "In Progress" | "Under Review" | "Completed";
  priority: string;
  deadline: Date;
  createdAt: Date;
};

type GroupedTasks = {
  "To-Do": Task[];
  "In Progress": Task[];
  "Under Review": Task[];
  Completed: Task[];
};

interface TaskContextType {
  tasks: Task[];
  groupedTasks: GroupedTasks;
  loading: boolean;
  error: string | null;
  refreshTasks: (userId: any) => void;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  groupedTasks: {
    "To-Do": [],
    "In Progress": [],
    "Under Review": [],
    Completed: [],
  },
  loading: false,
  error: null,
  refreshTasks: (userId: any) => {},
});

export const useTasks = () => useContext(TaskContext);

const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({
    "To-Do": [],
    "In Progress": [],
    "Under Review": [],
    Completed: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async (userId: any) => {
    try {
      setLoading(true);
      const data = await getAllTasks(userId);
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  const refreshTasks = (userId: any) => {
    fetchTasks(userId);
  };

  useEffect(() => {
    const groupTasksByStatus = (tasks: Task[]): GroupedTasks => {
      if (tasks && tasks.length > 0) {
        return tasks.reduce<GroupedTasks>(
          (acc, task) => {
            acc[task.status] = acc[task.status] || [];
            acc[task.status].push(task);
            return acc;
          },
          {
            "To-Do": [],
            "In Progress": [],
            "Under Review": [],
            Completed: [],
          }
        );
      } else {
        return {
          "To-Do": [],
          "In Progress": [],
          "Under Review": [],
          Completed: [],
        };
      }
    };

    const grouped = groupTasksByStatus(tasks);
    setGroupedTasks(grouped);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{ tasks, groupedTasks, loading, error, refreshTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider };
