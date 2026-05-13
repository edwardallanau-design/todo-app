import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { TodoList } from './todo-list';
import { TodoItems } from './todo-items/todo-items';
import { TodoService } from '../../../core/services/todo.service';
import { TodoItem } from '../../../core/models/todo-item.model';

const ITEMS: TodoItem[] = [
  { id: '1', title: 'First', completed: false, createdAt: '2026-01-01T01:00:00Z' },
];

describe('TodoList (container)', () => {
  let fixture: ComponentFixture<TodoList>;
  let mockService: {
    todos: ReturnType<typeof signal<TodoItem[]>>;
    toggle: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockService = { todos: signal(ITEMS), toggle: vi.fn(), delete: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [TodoList, NoopAnimationsModule],
      providers: [{ provide: TodoService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoList);
    fixture.detectChanges();
  });

  it('renders the todo-items component', () => {
    expect(fixture.debugElement.query(By.directive(TodoItems))).not.toBeNull();
  });

  it('passes todos from the service to todo-items', () => {
    const el = fixture.debugElement.query(By.directive(TodoItems));
    expect(el.componentInstance.todos).toEqual(ITEMS);
  });

  it('calls todoService.toggle when todo-items emits toggle', () => {
    const el = fixture.debugElement.query(By.directive(TodoItems));
    el.componentInstance.toggle.emit('1');
    expect(mockService.toggle).toHaveBeenCalledWith('1');
  });

  it('calls todoService.delete when todo-items emits delete', () => {
    const el = fixture.debugElement.query(By.directive(TodoItems));
    el.componentInstance.delete.emit('1');
    expect(mockService.delete).toHaveBeenCalledWith('1');
  });
});
