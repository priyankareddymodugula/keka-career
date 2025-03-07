import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-experience',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Work Experience</h2>
        <button
          (click)="addExperience()"
          class="text-primary hover:text-primary-dark flex items-center text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Experience
        </button>
      </div>

      <div *ngIf="experiencesCopy.length === 0" class="text-center py-8 border border-dashed border-gray-300 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <p class="text-gray-500">No work experience added yet</p>
        <button
          (click)="addExperience()"
          class="mt-2 text-primary hover:text-primary-dark text-sm font-medium"
        >
          Add your first experience
        </button>
      </div>

      <div *ngFor="let exp of experiencesCopy; let i = index" class="mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-medium">{{ exp.title || 'New Experience' }}</h3>
          <button
            (click)="removeExperience(i)"
            class="text-red-500 hover:text-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label [for]="'jobTitle' + i" class="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
            <input
              type="text"
              [id]="'jobTitle' + i"
              [(ngModel)]="exp.title"
              (ngModelChange)="updateExperiences()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          <div>
            <label [for]="'company' + i" class="block text-sm font-medium text-gray-700 mb-1">Company *</label>
            <input
              type="text"
              [id]="'company' + i"
              [(ngModel)]="exp.company"
              (ngModelChange)="updateExperiences()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="e.g. Acme Inc."
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label [for]="'startDate' + i" class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
            <input
              type="month"
              [id]="'startDate' + i"
              [(ngModel)]="exp.startDate"
              (ngModelChange)="updateExperiences()"
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
                [(ngModel)]="exp.endDate"
                (ngModelChange)="updateExperiences()"
                [disabled]="exp.current"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
              <div class="ml-4 flex items-center">
                <input
                  type="checkbox"
                  [id]="'current' + i"
                  [(ngModel)]="exp.current"
                  (ngModelChange)="updateCurrentJob(i)"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label [for]="'current' + i" class="ml-2 block text-sm text-gray-700">
                  Current
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label [for]="'location' + i" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            [id]="'location' + i"
            [(ngModel)]="exp.location"
            (ngModelChange)="updateExperiences()"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="e.g. San Francisco, CA"
          />
        </div>

        <div>
          <label [for]="'description' + i" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            [id]="'description' + i"
            [(ngModel)]="exp.description"
            (ngModelChange)="updateExperiences()"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Describe your responsibilities and achievements"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">
            Highlight your key responsibilities, achievements, and skills used in this role.
          </p>
        </div>
      </div>
    </div>
  `,
})
export class ExperienceComponent {
  @Input() experiences: any[] = [];
  @Output() experiencesChange = new EventEmitter<any[]>();

  experiencesCopy: any[] = [];

  ngOnChanges(): void {
    this.experiencesCopy = JSON.parse(JSON.stringify(this.experiences));
  }

  addExperience(): void {
    this.experiencesCopy.push({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    this.updateExperiences();
  }

  removeExperience(index: number): void {
    this.experiencesCopy.splice(index, 1);
    this.updateExperiences();
  }

  updateCurrentJob(index: number): void {
    if (this.experiencesCopy[index].current) {
      this.experiencesCopy[index].endDate = '';
    }
    this.updateExperiences();
  }

  updateExperiences(): void {
    this.experiencesChange.emit(this.experiencesCopy);
  }
}
