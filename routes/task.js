import express from 'express'
import { isAuthenticated } from '../middleware/index.js';
import { createNewTask, deleteTaskById, myTaskList, updateTaskById } from '../controller/task.js';

const router = express.Router();

router.post('/new', isAuthenticated,createNewTask)

router.get('/myTasks', isAuthenticated, myTaskList)

router.route('/:id').put(isAuthenticated, updateTaskById).delete(isAuthenticated, deleteTaskById)

export default router;