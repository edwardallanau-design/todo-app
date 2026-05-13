import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TodoService } from '../../../core/services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [MatCardModule, MatCheckboxModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  protected readonly todoService = inject(TodoService);
}
