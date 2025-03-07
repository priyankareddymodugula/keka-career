import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skills',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold mb-4">Skills</h2>

      <div class="mb-4">
        <label for="newSkill" class="block text-sm font-medium text-gray-700 mb-1">Add Skills</label>
        <div class="flex">
          <input
            type="text"
            id="newSkill"
            [(ngModel)]="newSkill"
            (keyup.enter)="addSkill()"
            class="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="e.g. JavaScript, Project Management, etc."
          />
          <button
            (click)="addSkill()"
            class="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark"
          >
            Add
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-1">
          Press Enter to add multiple skills quickly
        </p>
      </div>

      <div *ngIf="skillsCopy.length === 0" class="text-center py-8 border border-dashed border-gray-300 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <p class="text-gray-500">No skills added yet</p>
        <p class="text-sm text-gray-500 mt-1">
          Add skills to improve your job matches
        </p>
      </div>

      <div *ngIf="skillsCopy.length > 0" class="flex flex-wrap gap-2">
        <div
          *ngFor="let skill of skillsCopy; let i = index"
          class="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full flex items-center"
        >
          <span>{{ skill }}</span>
          <button
            (click)="removeSkill(i)"
            class="ml-2 text-gray-500 hover:text-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div >


      <div *ngIf="skillsCopy.length > 0" class="mt-4">
        <p class="text-sm text-gray-600">
          Skills are used to match you with relevant job opportunities. Add all relevant skills to improve your matches.
        </p>
      </div>
    </div>
  `,
})
export class SkillsComponent {
  @Input() skills: string[] = [];
  @Output() skillsChange = new EventEmitter<string[]>();

  skillsCopy: string[] = [];
  newSkill: string = '';

  ngOnChanges(): void {
    this.skillsCopy = [...this.skills];
  }

  addSkill(): void {
    if (this.newSkill.trim()) {
      // Check if skill already exists
      if (!this.skillsCopy.includes(this.newSkill.trim())) {
        this.skillsCopy.push(this.newSkill.trim());
        this.skillsChange.emit(this.skillsCopy);
      }
      this.newSkill = '';
    }
  }

  removeSkill(index: number): void {
    this.skillsCopy.splice(index, 1);
    this.skillsChange.emit(this.skillsCopy);
  }
}
