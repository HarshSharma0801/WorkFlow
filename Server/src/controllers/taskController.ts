import { Request, Response } from "express";
import Task, { ITask } from "../modals/task";

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, status, priority, deadline, userId } = req.body;
    const task: ITask = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      userId
    });
    await task.save();
    res.status(201).json({ valid: true, task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const tasks = await Task.find(userId ? { userId } : {});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task: ITask | null = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json({ task, valid: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

export const updateTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, status, priority, deadline } = req.body;
    const task: ITask | null = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, deadline },
      { new: true }
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json({ task, valid: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};


export const updateTaskByStatusId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {  status } = req.body;
    const task: ITask | null = await Task.findByIdAndUpdate(
      req.params.id,
      { status:status },
      { new: true }
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json({ task, valid: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

export const deleteTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task: ITask | null = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res
        .status(200)
        .json({ message: "Task deleted successfully", valid: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
