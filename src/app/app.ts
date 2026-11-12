import { Component, signal } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list';

@Component({
  imports: [TodoListComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-task-manager');
}
