import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resume',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold mb-4">Resume</h2>

      <div *ngIf="!resumeCopy" class="border-2 border-dashed border-gray-300 rounded-md p-6">
        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p class="text-gray-500 mb-2">Drag and drop your resume here, or</p>
          <label for="resume-upload" class="cursor-pointer">
            <span class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark inline-block">
              Browse Files
            </span>
            <input
              type="file"
              id="resume-upload"
              (change)="onFileSelected($event)"
              accept=".pdf,.doc,.docx"
              class="hidden"
            />
          </label>
          <p class="text-xs text-gray-500 mt-2">
            Supported formats: PDF, DOC, DOCX (Max 5MB)
          </p>
        </div>
      </div>

      <div *ngIf="resumeCopy" class="border border-gray-200 rounded-md p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <div>
              <p class="font-medium">{{ resumeCopy.name }}</p>
              <p class="text-sm text-gray-500">{{ formatFileSize(resumeCopy.size) }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              class="text-gray-500 hover:text-gray-700"
              title="Download Resume"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button
              (click)="removeResume()"
              class="text-red-500 hover:text-red-700"
              title="Remove Resume"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <p class="text-sm text-gray-600">
          Your resume will be used to apply for jobs and will be visible to employers when you apply.
          Make sure it's up to date with your latest experience and skills.
        </p>
      </div>
    </div>
  `,
})
export class ResumeComponent {
  @Input() resume: any = null;
  @Output() resumeChange = new EventEmitter<any>();

  resumeCopy: any = null;

  ngOnChanges(): void {
    this.resumeCopy = this.resume;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }

      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Please upload a PDF, DOC, or DOCX file.');
        return;
      }

      this.resumeCopy = file;
      this.resumeChange.emit(this.resumeCopy);
    }
  }

  removeResume(): void {
    this.resumeCopy = null;
    this.resumeChange.emit(null);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
