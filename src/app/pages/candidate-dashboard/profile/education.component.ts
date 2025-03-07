import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-education',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Education</h2>
        <button
          (click)="addEducation()"
          class="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Education
        </button>
      </div>

      <div *ngIf="educationCopy.length === 0" class="text-center py-8 border border-dashed border-gray-300 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
        <p class="text-gray-500">No education added yet</p>
        <button
          (click)="addEducation()"
          class="mt-2 text-primary hover:text-primary-dark text-sm font-medium"
        >
          Add your first education
        </button>
      </div>

      <div *ngFor="let edu of educationCopy; let i = index" class="mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-medium">{{ edu.school || 'New Education' }}</h3>
          <button
            (click)="removeEducation(i)"
            class="text-red-500 hover:text-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label [for]="'school' + i" class="block text-sm font-medium text-gray-700 mb-1">School/University *</label>
            <input
              type="text"
              [id]="'school' + i"
              [(ngModel)]="edu.school"
              (ngModelChange)="updateEducation()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="e.g. Stanford University"
              required
            />
          </div>

          <div>
            <label [for]="'degree' + i" class="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
            <input
              type="text"
              [id]="'degree' + i"
              [(ngModel)]="edu.degree"
              (ngModelChange)="updateEducation()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="e.g. Bachelor of Science"
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label [for]="'fieldOfStudy' + i" class="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
            <input
              type="text"
              [id]="'fieldOfStudy' + i"
              [(ngModel)]="edu.fieldOfStudy"
              (ngModelChange)="updateEducation()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="e.g. Computer Science"
            />
          </div>

          <div>
            <label [for]="'grade' + i" class="block text-sm font-medium text-gray-700 mb-1">Grade/GPA</label>
            <input
              type="text"
              [id]="'grade' + i"
              [(ngModel)]="edu.grade"
              (ngModelChange)="updateEducation()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="e.g. 3.8/4.0"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label [for]="'startDate' + i" class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
            <input
              type="month"
              [id]="'startDate' + i"
              [(ngModel)]="edu.startDate"
              (ngModelChange)="updateEducation()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label [for]="'endDate' + i" class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div class="flex items-center">
              <input
                type="month"
                [id]="'endDate' + i"
                [(ngModel)]="edu.endDate"
                (ngModelChange)="updateEducation()"
                [disabled]="edu.current"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
              <div class="ml-4 flex items-center">
                <input
                  type="checkbox"
                  [id]="'current' + i"
                  [(ngModel)]="edu.current"
                  (ngModelChange)="updateCurrentEducation(i)"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label [for]="'current' + i" class="ml-2 block text-sm text-gray-700">
                  Current
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label [for]="'description' + i" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            [id]="'description' + i"
            [(ngModel)]="edu.description"
            (ngModelChange)="updateEducation()"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Describe your studies, achievements, or activities"
          ></textarea>
        </div>
      </div>
    </div>
  `,
})
export class EducationComponent {
  @Input() education: any[] = [];
  @Output() educationChange = new EventEmitter<any[]>();

  educationCopy: any[] = [];

  ngOnChanges(): void {
    this.educationCopy = JSON.parse(JSON.stringify(this.education));
  }

  addEducation(): void {
    this.educationCopy.push({
      school: '',
      degree: '',
      fieldOfStudy: '',
      grade: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    this.updateEducation();
  }

  removeEducation(index: number): void {
    this.educationCopy.splice(index, 1);
    this.updateEducation();
  }

  updateCurrentEducation(index: number): void {
    if (this.educationCopy[index].current) {
      this.educationCopy[index].endDate = '';
    }
    this.updateEducation();
  }

  updateEducation(): void {
    this.educationChange.emit(this.educationCopy);
  }
}
