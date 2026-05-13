import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { vi } from 'vitest';
import { TodoList } from './todo-list';
import { TodoService } from '../../../core/services/todo.service';
import { TodoItem } from '../../../core/models/todo-item.model';

const ITEMS: TodoItem[] = [
  { id: '1', title: 'First',  completed: false, createdAt: '2026-01-01T01:00:00Z' },
  { id: '2', title: 'Second', completed: true,  createdAt: '2026-01-01T00:00:00Z' },
];

describe('TodoList', () => {
  let fixture: ComponentFixture<TodoList>;
  let mockService: { todos: ReturnType<typeof signal<TodoItem[]>>; toggle: ReturnType<typeof vi.fn>; delete: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockService = {
      todos: signal(ITEMS),
      toggle: vi.fn(),
      delete: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TodoList, NoopAnimationsModule],
      providers: [{ provide: TodoService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoList);
    fixture.detectChanges();
  });

  it('renders a row for each todo', () => {
    const rows = fixture.nativeElement.querySelectorAll('.todo-row');
    expect(rows.length).toBe(2);
  });

  it('applies completed class to completed todo title', () => {
    const completed = fixture.nativeElement.querySelectorAll('span.completed');
    expect(completed.length).toBe(1);
    expect(completed[0].textContent.trim()).toBe('Second');
  });

  it('calls toggle with correct id when checkbox clicked', () => {
    const input = fixture.nativeElement.querySelector('mat-checkbox input[type="checkbox"]');
    input.click();
    expect(mockService.toggle).toHaveBeenCalledWith('1');
  });

  it('calls delete with correct id when delete button clicked', () => {
    const btn = fixture.nativeElement.querySelector('button[aria-label="Delete First"]');
    btn.click();
    expect(mockService.delete).toHaveBeenCalledWith('1');
  });

  it('shows empty-state message when list is empty', async () => {
    await TestBed.resetTestingModule()
      .configureTestingModule({
        imports: [TodoList, NoopAnimationsModule],
        providers: [
          {
            provide: TodoService,
            useValue: { todos: signal([]), toggle: vi.fn(), delete: vi.fn() },
          },
        ],
      })
      .compileComponents();
    fixture = TestBed.createComponent(TodoList);
    fixture.detectChanges();
    const msg = fixture.nativeElement.querySelector('.empty-state');
    expect(msg).not.toBeNull();
  });
});
