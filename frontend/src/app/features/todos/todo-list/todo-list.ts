import { Component, inject } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';
import { TodoItems } from './todo-items/todo-items';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItems],
  template: `
    <app-todo-items
      [todos]="todoService.todos()"
      (toggle)="todoService.toggle($event)"
      (delete)="todoService.delete($event)"
    />
  `,
})
export class TodoList {
  protected readonly todoService = inject(TodoService);
}
