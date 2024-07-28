"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { updateTaskByStatusId } from "../services/task";
import { getAllTasks } from "../services/task";

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: Date;
  createdAt: Date;
};

interface GroupedTasks {
  [key: string]: Task[];
}

interface TaskContextType {
  tasks: Task[];
  groupedTasks: GroupedTasks;
  loading: boolean;
  error: string | null;
  refreshTasks: (userId: any) => void;
  updateTaskStatus: (taskId: string, status: string) => void;
  setGroupedTasks: React.Dispatch<React.SetStateAction<GroupedTasks>>;
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
  updateTaskStatus: (taskId: string, status: string) => {},
  setGroupedTasks: () => {},
});

export const useTasks = () => useContext(TaskContext);

const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      const updatedTask = await updateTaskByStatusId(taskId, status);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
      );
      const grouped = groupTasksByStatus(tasks);
      setGroupedTasks(grouped);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const refreshTasks = (userId: any) => {
    fetchTasks(userId);
  };

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

  useEffect(() => {
    const grouped = groupTasksByStatus(tasks);
    setGroupedTasks(grouped);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        groupedTasks,
        loading,
        error,
        refreshTasks,
        updateTaskStatus,
        setGroupedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider };
