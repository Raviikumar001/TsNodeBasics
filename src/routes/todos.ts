import { Router } from "express";
import { Todo } from "../models/todo";

type RequestBody = { text: string };
type RequestParams = { todoID: string}

let todos: Todo[] = [];
const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "Added Todo", todo: newTodo, todos: todos });
});

router.put("/todo/:todoID", (req, res, next) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;
  const tid = params.todoID;
  const todoIdndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIdndex >= 0) {
    todos[todoIdndex] = { id: todos[todoIdndex].id, text: body.text };
    return res.status(200).json({ message: "updated to do", todos: todos });
  }
});

router.delete("/todo/:todoID", (req, res, next) => {

    const params =req.params as RequestParams;
  todos = todos.filter((todoItem) => todoItem.id !== params.todoID);
  res.status(200).json({ message: "Deleted todo", todo: todos });
});

export default router;
