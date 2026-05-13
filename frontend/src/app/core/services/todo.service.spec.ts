import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { TodoItem } from '../models/todo-item.model';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:5000/api/todos';
  const mockItem: TodoItem = { id: '1', title: 'Test', completed: false, createdAt: '2026-01-01T00:00:00Z' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('load() sends GET and sets the signal', () => {
    service.load();
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockItem]);
    expect(service.todos()).toEqual([mockItem]);
  });

  it('add() sends POST and prepends item to signal', () => {
    service.add('Test');
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: 'Test' });
    req.flush(mockItem);
    expect(service.todos()).toContain(mockItem);
  });

  it('toggle() sends PATCH and flips completed in signal', () => {
    service.load();
    httpMock.expectOne(apiUrl).flush([mockItem]);

    service.toggle('1');
    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(null, { status: 204, statusText: 'No Content' });
    expect(service.todos()[0].completed).toBe(true);
  });

  it('delete() sends DELETE and removes item from signal', () => {
    service.load();
    httpMock.expectOne(apiUrl).flush([mockItem]);

    service.delete('1');
    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
    expect(service.todos()).toEqual([]);
  });

  it('load() sets status to loading then idle on success', () => {
    service.load();
    expect(service.status()).toBe('loading');
    const req = httpMock.expectOne(apiUrl);
    req.flush([mockItem]);
    expect(service.status()).toBe('idle');
  });

  it('load() sets status to error and message on HTTP failure', () => {
    service.load();
    const req = httpMock.expectOne(apiUrl);
    req.flush('Server error', { status: 500, statusText: 'Server Error' });
    expect(service.status()).toBe('error');
    expect(service.error()).toBe('Failed to load todos.');
  });
});
