import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold mb-4">Personal Information</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            type="text"
            id="firstName"
            [(ngModel)]="personalInfoCopy.firstName"
            (ngModelChange)="updatePersonalInfo()"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input
            type="text"
            id="lastName"
            [(ngModel)]="personalInfoCopy.lastName"
            (ngModelChange)="updatePersonalInfo()"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            id="email"
            [(ngModel)]="personalInfoCopy.email"
            (ngModelChange)="updatePersonalInfo()"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            [(ngModel)]="personalInfoCopy.phone"
            (ngModelChange)="updatePersonalInfo()"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div class="mb-4">
        <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          id="location"
          [(ngModel)]="personalInfoCopy.location"
          (ngModelChange)="updatePersonalInfo()"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="City, State, Country"
        />
      </div>

      <div>
        <label for="about" class="block text-sm font-medium text-gray-700 mb-1">About Me</label>
        <textarea
          id="about"
          [(ngModel)]="personalInfoCopy.about"
          (ngModelChange)="updatePersonalInfo()"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="Write a short bio about yourself"
        ></textarea>
        <p class="text-xs text-gray-500 mt-1">
          A brief summary of your professional background, skills, and career goals.
        </p>
      </div>
    </div>
  `,
})
export class PersonalInfoComponent {
  @Input() personalInfo: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    about: ''
  };

  @Output() personalInfoChange = new EventEmitter<any>();

  personalInfoCopy: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    about: ''
  };

  ngOnChanges(): void {
    this.personalInfoCopy = { ...this.personalInfo };
  }

  updatePersonalInfo(): void {
    this.personalInfoChange.emit(this.personalInfoCopy);
  }
}
