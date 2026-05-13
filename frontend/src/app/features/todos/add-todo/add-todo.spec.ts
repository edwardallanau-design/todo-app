import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddTodo } from './add-todo';
import { TodoService } from '../../../core/services/todo.service';

describe('AddTodo', () => {
  let fixture: ComponentFixture<AddTodo>;
  let mockService: { add: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockService = { add: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AddTodo, NoopAnimationsModule],
      providers: [{ provide: TodoService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodo);
    fixture.detectChanges();
  });

  it('submit button is disabled when input is empty', () => {
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button[aria-label="Add todo"]');
    expect(btn.disabled).toBe(true);
  });

  it('calls add with trimmed title when submitted', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '  Buy milk  ';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button[aria-label="Add todo"]').click();
    expect(mockService.add).toHaveBeenCalledWith('Buy milk');
  });

  it('does not call add when title is whitespace only', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '   ';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button[aria-label="Add todo"]').click();
    expect(mockService.add).not.toHaveBeenCalled();
  });

  it('clears the input after a successful submit', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'Buy milk';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button[aria-label="Add todo"]').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input').value).toBe('');
  });

  it('submits on Enter key press', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'Enter task';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();
    expect(mockService.add).toHaveBeenCalledWith('Enter task');
  });
});
