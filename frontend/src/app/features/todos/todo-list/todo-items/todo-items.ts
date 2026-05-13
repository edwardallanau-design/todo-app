import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TodoItem } from '../../../../core/models/todo-item.model';

@Component({
  selector: 'app-todo-items',
  imports: [MatCardModule, MatCheckboxModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './todo-items.html',
  styleUrl: './todo-items.scss',
})
export class TodoItems {
  @Input() todos: TodoItem[] = [];
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
}
