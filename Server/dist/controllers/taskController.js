"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskById = exports.updateTaskByStatusId = exports.updateTaskById = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const task_1 = __importDefault(require("../modals/task"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, priority, deadline, userId } = req.body;
        const task = new task_1.default({
            title,
            description,
            status,
            priority,
            deadline,
            userId
        });
        yield task.save();
        res.status(201).json({ valid: true, task });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});
exports.createTask = createTask;
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const tasks = yield task_1.default.find(userId ? { userId } : {});
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_1.default.findById(req.params.id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
        }
        else {
            res.status(200).json({ task, valid: true });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
});
exports.getTaskById = getTaskById;
const updateTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, priority, deadline } = req.body;
        const task = yield task_1.default.findByIdAndUpdate(req.params.id, { title, description, status, priority, deadline }, { new: true });
        if (!task) {
            res.status(404).json({ message: "Task not found" });
        }
        else {
            res.status(200).json({ task, valid: true });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});
exports.updateTaskById = updateTaskById;
const updateTaskByStatusId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const task = yield task_1.default.findByIdAndUpdate(req.params.id, { status: status }, { new: true });
        if (!task) {
            res.status(404).json({ message: "Task not found" });
        }
        else {
            res.status(200).json({ task, valid: true });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});
exports.updateTaskByStatusId = updateTaskByStatusId;
const deleteTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_1.default.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
        }
        else {
            res
                .status(200)
                .json({ message: "Task deleted successfully", valid: true });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});
exports.deleteTaskById = deleteTaskById;
//# sourceMappingURL=taskController.js.map