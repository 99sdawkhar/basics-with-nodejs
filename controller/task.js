import ErrorHandler from "../middleware/error.js";
import Task from "../model/task.js";

export const createNewTask = async (req ,res, next) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return next(new ErrorHandler('All fields are required', 404))
    }
    await Task.create({
        title,
        description,
        user: req.user,
    })

    res.status(201).json({ success: true, message: 'Task created successfully' })
}

export const myTaskList = async (req ,res) => {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId })

    res.json({
        success: true,
        tasks
    })
}

export const updateTaskById = async (req ,res, next) => {
    const currentTask = await Task.findById(req.params.id)
    if (!currentTask) {
        return next(new ErrorHandler('Task not found', 404))
    }

    currentTask.isCompleted = !currentTask.isCompleted;
    currentTask.save(); // to update the task

    res.json({
        success: true,
        message: "Task updated successfully",
    })
}

export const deleteTaskById = async (req ,res, next) => {
    const currentTask = await Task.findById(req.params.id)
    
    if (!currentTask) {
        return next(new ErrorHandler('Task not found', 404))
    }
    currentTask.deleteOne(); // to update the task

    res.json({
        success: true,
        message: "Task deleted successfully",
    })
}