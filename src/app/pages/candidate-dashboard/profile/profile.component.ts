import { Component, type OnInit } from "@angular/core"
import  { AuthService } from "../../../services/auth.service"
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-profile",
  template: `
  <div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Profile</h1>
  <form [formGroup]="profileForm" *ngIf="isEditing; else viewMode">
    <!-- Personal Details -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Personal Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4" formGroupName="personalDetails">
        <div>
          <label class="block text-gray-700">Name</label>
          <input formControlName="Name" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Email</label>
          <input formControlName="Email" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Mobile Phone</label>
          <input formControlName="MobilePhone" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Address</label>
          <input formControlName="Address" class="w-full p-2 border rounded-lg">
        </div>
      </div>
    </div>

    <!-- Professional Details -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Professional Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4"  formGroupName="professionalDetails">
        <div>
          <label class="block text-gray-700">Current Location</label>
          <input formControlName="CurrentLocation" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Experience</label>
          <input formControlName="Experience" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Current Role</label>
          <input formControlName="CurrentRole" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Current CTC</label>
          <input formControlName="CurrentCTC" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Current Company</label>
          <input formControlName="CurrentCompany" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Current Industry</label>
          <input formControlName="CurrentIndustry" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Education Details</label>
          <input formControlName="EducationDetails" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Skills</label>
          <input formControlName="Skills" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Current Notice Period</label>
          <input formControlName="CurrentNoticePeriod" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Social Media</label>
          <input formControlName="SocialMedia" class="w-full p-2 border rounded-lg">
        </div>
      </div>
    </div>

    <!-- Job Preference -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Job Preference</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4"  formGroupName="jobPreference">
        <div>
          <label class="block text-gray-700">Location</label>
          <input formControlName="Location" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Expected CTC</label>
          <input formControlName="ExpectedCTC" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Role</label>
          <input formControlName="Role" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Industry</label>
          <input formControlName="Industry" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Work Mode</label>
          <input formControlName="WorkMode" class="w-full p-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-gray-700">Job Type</label>
          <input formControlName="JobType" class="w-full p-2 border rounded-lg">
        </div>
      </div>
    </div>

    <!-- Save and Cancel Buttons -->
    <div class="flex justify-end space-x-4">
      <button type="button" (click)="toggleEdit()" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
        Cancel
      </button>
      <button type="button" (click)="saveProfile()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Save
      </button>
    </div>
  </form>

  <!-- View Mode -->
  <ng-template #viewMode>
    <!-- Personal Details -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Personal Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-700">Name</label>
          <p class="text-gray-900">{{ candidate['Personal Details'].Name }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Email</label>
          <p class="text-gray-900">{{ candidate['Personal Details'].Email }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Mobile Phone</label>
          <p class="text-gray-900">{{ candidate['Personal Details']['Mobile Phone'] }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Address</label>
          <p class="text-gray-900">{{ candidate['Personal Details'].Address }}</p>
        </div>
      </div>
    </div>

    <!-- Professional Details -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Professional Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-700">Current Location</label>
          <p class="text-gray-900">{{ candidate['Professional Details']['Current Location'] }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Experience</label>
          <p class="text-gray-900">{{ candidate['Professional Details'].Experience }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Current Role</label>
          <p class="text-gray-900">{{ candidate['Professional Details']['Current Role'] }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Current CTC</label>
          <p class="text-gray-900">{{ candidate['Professional Details']['Current CTC'] }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Current Company</label>
          <p class="text-gray-900">{{ candidate['Professional Details']['Current Company'] }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Current Industry</label>
          <p class="text-gray-900">{{ candidate['Professional Details']['Current Industry'] }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Education Details</label>
          <p class="text-gray-900">{{ candidate['Professional Details']['Education Details'] }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Skills</label>
          <p class="text-gray-900">{{ candidate['Professional Details'].Skills.join(', ') }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Current Notice Period</label>
          <p class="text-gray-900">{{ candidate['Professional Details']['Current Notice Period'] }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Social Media</label>
          <p class="text-gray-900">{{ candidate['Professional Details']['Social Media'] }}</p>
        </div>
      </div>
    </div>

    <!-- Job Preference -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Job Preference</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-gray-700">Location</label>
          <p class="text-gray-900">{{ candidate['Job Preference'].Location }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Expected CTC</label>
          <p class="text-gray-900">{{ candidate['Job Preference']['Expected CTC'] }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Role</label>
          <p class="text-gray-900">{{ candidate['Job Preference'].Role }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Industry</label>
          <p class="text-gray-900">{{ candidate['Job Preference'].Industry }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Work Mode</label>
          <p class="text-gray-900">{{ candidate['Job Preference']['Work Mode'] }}</p>
        </div>
        <div>
          <label class="block text-gray-700">Job Type</label>
          <p class="text-gray-900">{{ candidate['Job Preference']['Job Type'] }}</p>
        </div>
      </div>
    </div>

    <!-- Edit Button -->
    <div class="flex justify-end">
      <button (click)="toggleEdit()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Edit Profile
      </button>
    </div>
  </ng-template>
</div>



  `,
})
export class ProfileComponent implements OnInit {

  candidate = {
    "Personal Details": {
      "Name": "Amit Sharma",
      "Email": "candidate0@example.com",
      "Mobile Phone": "6543210987",
      "Address": "Bangalore, India"
    },
    "Professional Details": {
      "Current Location": "Delhi, India",
      "Experience": "8 years",
      "Current Role": "Data Analyst",
      "Current CTC": "8,00,000 per annum",
      "Current Company": "Amazon",
      "Current Industry": "E-commerce",
      "Education Details": "Bachelor's degree in Computer Science",
      "Skills": [
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB"
      ],
      "Current Notice Period": "15 days",
      "Social Media": "linkedin.com/in/sneha"
    },
    "Job Preference": {
      "Location": "Bangalore, India",
      "Expected CTC": "₹12,00,000 - ₹18,00,000 per annum",
      "Role": "UX Designer",
      "Industry": "E-commerce",
      "Work Mode": "Hybrid",
      "Job Type": "Contract"
    }
  };

  profileForm: FormGroup;
  isEditing = false;
  profile:any;
  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.profile = { ...user };
      }
    });
  }

  constructor(private fb: FormBuilder,private authService: AuthService) {
    this.profileForm = this.fb.group({
      personalDetails: this.fb.group({
        Name: new FormControl(this.candidate['Personal Details'].Name, Validators.required),
        Email: new FormControl(this.candidate['Personal Details'].Email, [Validators.required, Validators.email]),
        MobilePhone: new FormControl(this.candidate['Personal Details']['Mobile Phone']),
        Address: new FormControl(this.candidate['Personal Details'].Address)
      }),
      professionalDetails: this.fb.group({
        CurrentLocation: new FormControl(this.candidate['Professional Details']['Current Location']),
        Experience: new FormControl(this.candidate['Professional Details'].Experience),
        CurrentRole: new FormControl(this.candidate['Professional Details']['Current Role']),
        CurrentCTC: new FormControl(this.candidate['Professional Details']['Current CTC']),
        CurrentCompany: new FormControl(this.candidate['Professional Details']['Current Company']),
        CurrentIndustry: new FormControl(this.candidate['Professional Details']['Current Industry']),
        EducationDetails: new FormControl(this.candidate['Professional Details']['Education Details']),
        Skills: new FormControl(this.candidate['Professional Details'].Skills.join(', ')),
        CurrentNoticePeriod: new FormControl(this.candidate['Professional Details']['Current Notice Period']),
        SocialMedia: new FormControl(this.candidate['Professional Details']['Social Media'])
      }),
      jobPreference: this.fb.group({
        Location: new FormControl(this.candidate['Job Preference'].Location),
        ExpectedCTC:new FormControl(this.candidate['Job Preference']['Expected CTC']),
        Role: new FormControl(this.candidate['Job Preference'].Role),
        Industry: new FormControl(this.candidate['Job Preference'].Industry),
        WorkMode: new FormControl(this.candidate['Job Preference']['Work Mode']),
        JobType: new FormControl(this.candidate['Job Preference']['Job Type'])
      })
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.profileForm.reset({
        personalDetails: this.candidate['Personal Details'],
        professionalDetails: this.candidate['Professional Details'],
        jobPreference: this.candidate['Job Preference']
      });
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this.candidate['Personal Details'] = this.profileForm.value.personalDetails;
      this.candidate['Professional Details'] = this.profileForm.value.professionalDetails;
      this.candidate['Job Preference'] = this.profileForm.value.jobPreference;
      this.isEditing = false;
    } else {
      alert('Please fill all required fields.');
    }
  }
}
