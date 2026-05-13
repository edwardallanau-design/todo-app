import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from '../../../core/services/todo.service';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss',
})
export class AddTodo {
  private readonly todoService = inject(TodoService);
  protected readonly titleControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  submit(): void {
    const title = this.titleControl.value?.trim();
    if (!title) return;
    this.todoService.add(title);
    this.titleControl.reset();
  }
}
