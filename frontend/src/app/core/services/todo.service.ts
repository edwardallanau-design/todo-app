import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';
import { environment } from '../../../environments/environment';

export type LoadStatus = 'idle' | 'loading' | 'error';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly apiUrl = `${environment.apiUrl}/api/todos`;
  private readonly _todos = signal<TodoItem[]>([]);
  private readonly _status = signal<LoadStatus>('idle');
  private readonly _error = signal<string | null>(null);

  readonly todos = this._todos.asReadonly();
  readonly status = this._status.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private readonly http: HttpClient) {}

  load(): void {
    this._status.set('loading');
    this._error.set(null);
    this.http
      .get<TodoItem[]>(this.apiUrl)
      .pipe(
        catchError(() => {
          this._status.set('error');
          this._error.set('Failed to load todos.');
          return EMPTY;
        })
      )
      .subscribe(items => {
        this._todos.set(items);
        this._status.set('idle');
      });
  }

  add(title: string): void {
    this.http
      .post<TodoItem>(this.apiUrl, { title })
      .pipe(catchError(() => { this._error.set('Failed to add todo.'); return EMPTY; }))
      .subscribe(item => this._todos.update(current => [item, ...current]));
  }

  toggle(id: string): void {
    this.http
      .patch<void>(`${this.apiUrl}/${id}`, {})
      .pipe(catchError(() => { this._error.set('Failed to update todo.'); return EMPTY; }))
      .subscribe(() =>
        this._todos.update(current =>
          current.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        )
      );
  }

  delete(id: string): void {
    this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(() => { this._error.set('Failed to delete todo.'); return EMPTY; }))
      .subscribe(() =>
        this._todos.update(current => current.filter(t => t.id !== id))
      );
  }
}
