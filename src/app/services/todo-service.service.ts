import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private storageKey = 'todoItems';

  constructor(private location: Location) { }

  reloadPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }
  
  getTodo(): TodoItem[] {
    const todo = localStorage.getItem(this.storageKey);
    return todo ? JSON.parse(todo) : [];
  }

  saveTodo(todos: TodoItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  addTodo(todo: TodoItem) {
    const todos = this.getTodo();
    todos.push(todo);
    this.saveTodo(todos);
  }

  updateTodoStatus(index: number, completed: boolean) {
    const todos = this.getTodo();
    if (todos[index]) {
      todos[index].completed = completed;
      this.saveTodo(todos);
    }
  }

  deleteTodo(index: number) {
    const todos = this.getTodo();
    todos.splice(index, 1);
    this.saveTodo(todos);
  }

}
