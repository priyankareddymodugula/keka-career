import { Component, type OnInit } from "@angular/core"
import  { AuthService } from "../../../services/auth.service"

@Component({
  selector: "app-profile",
  template: `
   <div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Candidate Profile</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
  </div>

  <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
    <dl class="sm:divide-y sm:divide-gray-200">

      <!-- Full Name -->
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Full Name</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <span *ngIf="!editMode['name']">{{ profile.name }}</span>
          <input *ngIf="editMode['name']" [(ngModel)]="profile.name" class="w-full px-3 py-2 border rounded-md">
        </dd>
        <button class="text-blue-600" (click)="enableEdit('name')" *ngIf="!editMode['name']">Edit</button>
        <button class="text-green-600" (click)="saveProfile('name')" *ngIf="editMode['name']">Save</button>
      </div>

      <!-- Email -->
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Email</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <span *ngIf="!editMode['email']">{{ profile.email }}</span>
          <input *ngIf="editMode['email']" [(ngModel)]="profile.email" class="w-full px-3 py-2 border rounded-md">
        </dd>
        <button class="text-blue-600" (click)="enableEdit('email')" *ngIf="!editMode['email']">Edit</button>
        <button class="text-green-600" (click)="saveProfile('email')" *ngIf="editMode['email']">Save</button>
      </div>

      <!-- Experience -->
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Experience (years)</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <span *ngIf="!editMode['experience']">{{ profile.experience }}</span>
          <input *ngIf="editMode['experience']" [(ngModel)]="profile.experience" type="number" class="w-full px-3 py-2 border rounded-md">
        </dd>
        <button class="text-blue-600" (click)="enableEdit('experience')" *ngIf="!editMode['experience']">Edit</button>
        <button class="text-green-600" (click)="saveProfile('experience')" *ngIf="editMode['experience']">Save</button>
      </div>

      <!-- Skills -->
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Skills</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <span *ngIf="!editMode['skills']">{{ profile.skills }}</span>
          <textarea *ngIf="editMode['skills']" [(ngModel)]="profile.skills" rows="3" class="w-full px-3 py-2 border rounded-md"></textarea>
        </dd>
        <button class="text-blue-600" (click)="enableEdit('skills')" *ngIf="!editMode['skills']">Edit</button>
        <button class="text-green-600" (click)="saveProfile('skills')" *ngIf="editMode['skills']">Save</button>
      </div>

      <!-- Resume -->
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Resume</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <input type="file" (change)="onFileSelected($event)" class="w-full px-3 py-2 border rounded-md">
        </dd>
      </div>

      <!-- Links -->
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Links</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <span *ngIf="!editMode['links']">{{ profile.links }}</span>
          <input *ngIf="editMode['links']" [(ngModel)]="profile.links" placeholder="LinkedIn, GitHub, etc." class="w-full px-3 py-2 border rounded-md">
        </dd>
        <button class="text-blue-600" (click)="enableEdit('links')" *ngIf="!editMode['links']">Edit</button>
        <button class="text-green-600" (click)="saveProfile('links')" *ngIf="editMode['links']">Save</button>
      </div>

    </dl>
  </div>
</div>

  `,
})
export class ProfileComponent implements OnInit {
  profile: any = {};
  editMode: { [key: string]: boolean } = {}; // Track edit mode for each field

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.profile = { ...user };
      }
    });
  }

  enableEdit(field: string) {
    this.editMode[field] = true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    if (file) {
    // Here you would typically upload the file to your server
    console.log("File selected:", file.name)
    }
    }

  saveProfile(field: string) {
    this.editMode[field] = false;
    this.authService.updateProfile(this.profile).subscribe(
      (updatedUser) => {
        console.log("Profile updated successfully");
        this.authService.setCurrentUser(updatedUser);
      },
      (error) => {
        console.error("Error updating profile:", error);
      }
    );
  }
}

