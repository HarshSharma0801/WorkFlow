import { Router } from 'express';
import {  getUserByEmail, getUserById } from '../controllers/usersController';
import { createTask ,  getAllTasks , getTaskById , updateTaskById , deleteTaskById , updateTaskByStatusId} from '../controllers/taskController';
import {register, login,} from '../controllers/auth'
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getUserByEmail', getUserByEmail);
router.get('/getUserById', getUserById);

router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTaskById);
router.put('/Statustasks/:id', updateTaskByStatusId);

router.delete('/tasks/:id', deleteTaskById);

export default router;
