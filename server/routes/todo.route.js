import express from 'express';
import { checkAuth } from '../middleware/checkauth.middleware.js';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controller/todo.controller.js';



const router = express.Router();


router.route("/create").post(checkAuth, createTodo);
router.route("/").get(checkAuth, getTodos);
router.route("/:id").put(checkAuth, updateTodo);
router.route("/delete/:id").delete(checkAuth, deleteTodo);

export default router;