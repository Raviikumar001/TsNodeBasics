"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added Todo", todo: newTodo, todos: todos });
});
router.put("/todo/:todoID", (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const tid = params.todoID;
    const todoIdndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if (todoIdndex >= 0) {
        todos[todoIdndex] = { id: todos[todoIdndex].id, text: body.text };
        return res.status(200).json({ message: "updated to do", todos: todos });
    }
});
router.delete("/todo/:todoID", (req, res, next) => {
    const params = req.params;
    todos = todos.filter((todoItem) => todoItem.id !== params.todoID);
    res.status(200).json({ message: "Deleted todo", todo: todos });
});
exports.default = router;
