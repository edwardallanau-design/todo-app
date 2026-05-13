import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from '../models/todo-item.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly apiUrl = `${environment.apiUrl}/api/todos`;
  private readonly _todos = signal<TodoItem[]>([]);
  readonly todos = this._todos.asReadonly();

  constructor(private readonly http: HttpClient) {}

  load(): void {
    this.http.get<TodoItem[]>(this.apiUrl).subscribe(items => this._todos.set(items));
  }

  add(title: string): void {
    this.http
      .post<TodoItem>(this.apiUrl, { title })
      .subscribe(item => this._todos.update(current => [item, ...current]));
  }

  toggle(id: string): void {
    this.http
      .patch<void>(`${this.apiUrl}/${id}`, {})
      .subscribe(() =>
        this._todos.update(current =>
          current.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        )
      );
  }

  delete(id: string): void {
    this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .subscribe(() =>
        this._todos.update(current => current.filter(t => t.id !== id))
      );
  }
}
