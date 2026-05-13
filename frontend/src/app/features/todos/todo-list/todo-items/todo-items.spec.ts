import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { TodoItems } from './todo-items';
import { TodoItem } from '../../../../core/models/todo-item.model';

const makeItem = (overrides: Partial<TodoItem> = {}): TodoItem => ({
  id: '1',
  title: 'First',
  completed: false,
  createdAt: '2026-01-01T01:00:00Z',
  ...overrides,
});

describe('TodoItems (presentational)', () => {
  let fixture: ComponentFixture<TodoItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItems, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItems);
    fixture.componentRef.setInput('todos', [makeItem()]);
    fixture.detectChanges();
  });

  it('renders a row for each todo', () => {
    const rows = fixture.nativeElement.querySelectorAll('.todo-row');
    expect(rows.length).toBe(1);
  });

  it('applies completed class to completed todo title', () => {
    fixture.componentRef.setInput('todos', [makeItem({ completed: true })]);
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span.completed');
    expect(span).not.toBeNull();
    expect(span.textContent.trim()).toBe('First');
  });

  it('shows empty-state message when todos is empty', () => {
    fixture.componentRef.setInput('todos', []);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.empty-state')).not.toBeNull();
  });

  it('emits toggle with todo id when checkbox is clicked', () => {
    const spy = vi.fn();
    fixture.componentInstance.toggle.subscribe(spy);
    const cb = fixture.debugElement.query(By.css('mat-checkbox'));
    cb.triggerEventHandler('change', { checked: true });
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('emits delete with todo id when delete button is clicked', () => {
    const spy = vi.fn();
    fixture.componentInstance.delete.subscribe(spy);
    const btn = fixture.nativeElement.querySelector('button[aria-label="Delete First"]');
    btn.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('1');
  });
});
