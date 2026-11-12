import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../task.model';

// Import des composants NG-ZORRO
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzTagModule,
    NzIconModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzTableModule
  ],
  template: `
    <div style="max-width: 700px; margin: 40px auto; padding: 0 20px;">
      <nz-card nzTitle="🚀 Angular Task Manager" [nzExtra]="taskCountTemplate">

        <!-- Formulaire d'ajout -->
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
          <input
            nz-input
            placeholder="What needs to be done?"
            [(ngModel)]="newTitle"
            (keyup.enter)="addTask()"
          />
          <nz-select [(ngModel)]="newPriority" style="width: 130px;">
            <nz-option nzValue="low" nzLabel="Low"></nz-option>
            <nz-option nzValue="medium" nzLabel="Medium"></nz-option>
            <nz-option nzValue="high" nzLabel="High"></nz-option>
          </nz-select>
          <button nz-button nzType="primary" (click)="addTask()">Add Task</button>
        </div>

        <!-- Filtres -->
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
          <button nz-button [nzType]="filter() === 'all' ? 'primary' : 'default'" (click)="filter.set('all')">All</button>
          <button nz-button [nzType]="filter() === 'active' ? 'primary' : 'default'" (click)="filter.set('active')">Active</button>
          <button nz-button [nzType]="filter() === 'completed' ? 'primary' : 'default'" (click)="filter.set('completed')">Completed</button>
        </div>

        <!-- Tableau NG-ZORRO -->
        <nz-table #basicTable [nzData]="filteredTasks()" [nzFrontPagination]="true" [nzPageSize]="5">
          <thead>
            <tr>
              <th nzWidth="60px">Status</th>
              <th>Task Title</th>
              <th nzWidth="120px">Priority</th>
              <th nzWidth="80px">Action</th>
            </tr>
          </thead>
          <tbody>
            @for (task of basicTable.data; track task.id) {
              <tr>
                <td>
                  <label nz-checkbox [ngModel]="task.completed" (ngModelChange)="toggleTask(task.id)"></label>
                </td>
                <td>
                  <span [style.text-decoration]="task.completed ? 'line-through' : 'none'"
                        [style.color]="task.completed ? '#8c8c8c' : 'inherit'">
                    {{ task.title }}
                  </span>
                </td>
                <td>
                  <nz-tag [nzColor]="getPriorityColor(task.priority)">{{ task.priority | uppercase }}</nz-tag>
                </td>
                <td>
                  <button
                    nz-button
                    nzDanger
                    nz-popconfirm
                    nzPopconfirmTitle="Are you sure delete this task?"
                    (nzOnConfirm)="deleteTask(task.id)"
                    nzType="text">
                    <span nz-icon nzType="delete"></span>
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="4" style="text-align: center; color: #8c8c8c;">No tasks found.</td>
              </tr>
            }
          </tbody>
        </nz-table>

      </nz-card>
    </div>

    <ng-template #taskCountTemplate>
      <span>{{ activeCount() }} active left</span>
    </ng-template>
  `
})
export class TodoListComponent {
  tasks = signal<Task[]>(this.loadFromStorage());
  filter = signal<'all' | 'active' | 'completed'>('all');

  newTitle = '';
  newPriority: 'low' | 'medium' | 'high' = 'medium';

  filteredTasks = computed(() => {
    const currentFilter = this.filter();
    const allTasks = this.tasks();
    if (currentFilter === 'active') return allTasks.filter(t => !t.completed);
    if (currentFilter === 'completed') return allTasks.filter(t => t.completed);
    return allTasks;
  });

  activeCount = computed(() => this.tasks().filter(t => !t.completed).length);

  constructor() {
    effect(() => {
      localStorage.setItem('angular_tasks', JSON.stringify(this.tasks()));
    });
  }

  addTask() {
    if (!this.newTitle.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: this.newTitle.trim(),
      completed: false,
      priority: this.newPriority
    };
    this.tasks.update(tasks => [newTask, ...tasks]);
    this.newTitle = '';
    this.newPriority = 'medium';
  }

  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));
  }

  getPriorityColor(priority: 'low' | 'medium' | 'high'): string {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
    }
  }

  private loadFromStorage(): Task[] {
    const saved = localStorage.getItem('angular_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Learn Angular Signals', completed: true, priority: 'high' },
      { id: 2, title: 'Master NG-ZORRO UI components', completed: false, priority: 'medium' }
    ];
  }
}
