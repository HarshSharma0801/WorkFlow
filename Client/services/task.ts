import apiClient from "./apiClient";
interface Task {
  id?: string;
  title: string | undefined;
  description: string;
  status: string;
  priority: string;
  deadline: Date | undefined;
}

export const createTask = async (task: Task) => {
  try {
    const response = await apiClient.post("/tasks", task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTasks = async (userId:any) => {
  try {
    const response = await apiClient.get("/tasks", {
      params: {
        userId: userId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTaskById = async (id: string) => {
  try {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskById = async (id: string, task: Task) => {
  try {
    const response = await apiClient.put(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskById = async (id: string) => {
  try {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
