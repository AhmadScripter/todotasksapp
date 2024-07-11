import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../../services/todo-service.service';
import { TodoItem } from '../../models/todo-item';
import { DatePipe } from '@angular/common';
import { TodoFilterService } from '../../services/todo-filter.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  providers: [DatePipe]
})
export class TasksComponent implements OnInit {

  todos: TodoItem[] = [];
  filteredTodos: TodoItem[] = [];
  selectedFilter: string = 'All';

  constructor(private todoService: TodoServiceService, private todoFilterService: TodoFilterService) { }
  ngOnInit(): void {
    this.loadTodos();
    this.todoService.getTodo();
    this.todoFilterService.currentFilter.subscribe(filter => {
      this.selectedFilter = filter;
      this.applyFilter();
    });

  }
  applyFilter() {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    if (this.selectedFilter === 'Today') {
      this.filteredTodos = this.todos.filter(todo => {
        const todoDate = new Date(todo.date.split('/').reverse().join('-'));
        return this.isSameDay(todoDate, new Date());
      });
    } else if (this.selectedFilter === 'This Week') {
      this.filteredTodos = this.todos.filter(todo => {
        const todoDate = new Date(todo.date.split('/').reverse().join('-'));
        return todoDate >= startOfWeek && todoDate <= endOfWeek;
      });
    } else if (this.selectedFilter === 'This Month') {
      this.filteredTodos = this.todos.filter(todo => {
        const todoDate = new Date(todo.date.split('/').reverse().join('-'));
        return todoDate >= startOfMonth && todoDate <= endOfMonth;
      });
    } else {
      this.filteredTodos = this.todos;
    }
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  loadTodos() {
    this.todos = this.todoService.getTodo();
    this.applyFilter()
  }
  toggleTodoStatus(index: number, event: Event) {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    this.todoService.updateTodoStatus(index, isChecked);
    this.loadTodos();

  }
  deteteTodo(index: number){
    this.todoService.deleteTodo(index);
    this.loadTodos();
  }
 
}
