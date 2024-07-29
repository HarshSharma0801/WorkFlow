"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const taskController_1 = require("../controllers/taskController");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post('/register', auth_1.register);
router.post('/login', auth_1.login);
router.get('/getUserByEmail', usersController_1.getUserByEmail);
router.get('/getUserById', usersController_1.getUserById);
router.post('/tasks', taskController_1.createTask);
router.get('/tasks', taskController_1.getAllTasks);
router.get('/tasks/:id', taskController_1.getTaskById);
router.put('/tasks/:id', taskController_1.updateTaskById);
router.put('/Statustasks/:id', taskController_1.updateTaskByStatusId);
router.delete('/tasks/:id', taskController_1.deleteTaskById);
exports.default = router;
//# sourceMappingURL=router.js.map