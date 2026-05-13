import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TodoService } from './core/services/todo.service';
import { AddTodo } from './features/todos/add-todo/add-todo';
import { TodoList } from './features/todos/todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, AddTodo, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.load();
  }
}
