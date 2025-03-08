import { JobService } from './../../../services/job.service';
import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import  { ActivatedRoute, Router } from "@angular/router"
import  { RecruiterService } from "../../../services/recruiter.service"

@Component({
  selector: "app-create-job",
  template: `
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Create New Job</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Fill in the details to create a new job posting.</p>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <form (ngSubmit)="createJob()" class="space-y-6 sm:px-6 sm:py-5">
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="jobProfile" class="block text-sm font-medium text-gray-700">Job Profile</label>
              <div class="mt-1">
                <input type ="text" name="jobProfile" id="jobProfile" [(ngModel)]="job['Job Profile']" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <div class="mt-1">
                <input type="text" name="name" id="name" [(ngModel)]="job.Name" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
              <div class="mt-1">
                <input type="text" name="role" id="role" [(ngModel)]="job.Role" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="department" class="block text-sm font-medium text-gray-700">Department</label>
              <div class="mt-1">
                <input type="text" name="department" id="department" [(ngModel)]="job.Department" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
              <div class="mt-1">
                <input type="text" name="location" id="location" [(ngModel)]="job.Location" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="workMode" class="block text-sm font-medium text-gray-700">Work Mode</label>
              <div class="mt-1">
                <select id="workMode" name="workMode" [(ngModel)]="job['Work Mode']" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="job" class="block text-sm font-medium text-gray-700">Job </label>
              <div class="mt-1">
                <select id="job" name="job" [(ngModel)]="job['Job ']" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="openings" class="block text-sm font-medium text-gray-700">Number of Openings</label>
              <div class="mt-1">
                <input type="number" name="openings" id="openings" [(ngModel)]="job['No of openings']" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="description" class="block text-sm font-medium text-gray-700">Job Description</label>
              <div class="mt-1">
                <textarea id="description" name="description" rows="5" [(ngModel)]="job.Description" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
              </div>
            </div>

            <div class="sm:col-span-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Candidate Preferences</h3>
            </div>

            <div class="sm:col-span-6">
              <label for="skills" class="block text-sm font-medium text-gray-700">Skill Set (comma separated)</label>
              <div class="mt-1">
                <input type="text" name="skills" id="skills" [(ngModel)]="skillsInput" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="experience" class="block text-sm font-medium text-gray-700">Experience</label>
              <div class="mt-1">
              <input type="text" name="experience" id="experience" [(ngModel)]="job['Candidate Preference'].Experience" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="noticePeriod" class="block text-sm font-medium text-gray-700">Notice Period</label>
              <div class="mt-1">
              <input type="text" name="noticePeriod" id="noticePeriod" [(ngModel)]="job['Candidate Preference']['Notice Period']" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">


              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="education" class="block text-sm font-medium text-gray-700">Education Details</label>
              <div class="mt-1">
                <input type="text" name="education" id="education" [(ngModel)]="job['Candidate Preference']['Education Details']" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="salaryRange" class="block text-sm font-medium text-gray-700">Salary Range</label>
              <div class="mt-1">
                <input type="text" name="salaryRange" id="salaryRange" [(ngModel)]="job['Candidate Preference']['Salary Range']" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md" placeholder="₹20,00,000 - ₹30,00,000 per annum">
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
              <div class="mt-1">
                <select id="status" name="status" [(ngModel)]="jobStatus" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="deadline" class="block text-sm font-medium text-gray-700">Application Deadline</label>
              <div class="mt-1">
                <input type="date" name="deadline" id="deadline" [(ngModel)]="applicationDeadline" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>
          </div>

          <div class="pt-5">
            <div class="flex justify-end">
              <button type="button" (click)="cancel()" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Cancel
              </button>
              <button  *ngIf="isedit"  type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
             Update Job
              </button>
               <button *ngIf="!isedit" type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Create Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class CreateJobComponent {
  job: any = {
    "Job Profile": "",
    Name: "",
    Description: "",
    Role: "",
    Location: "",
    "Work Mode": "Remote",
    "No of openings": 1,
    "Job ": "Full-time",
    Department: "",
    "Candidate Preference": {
      "Skill Set": "",
      Experience: "3-5 years",
      "Education Details": "",
      "Notice Period": "30 days",
      "Salary Range": "₹20,00,000 - ₹30,00,000 per annum",
    },
  };

  skillsInput = "";
  jobStatus = "Draft";
  applicationDeadline = "";
  jobId:string = '';
  isedit:boolean = false;
  constructor(
    private recruiterService: RecruiterService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.jobId = params.get("jobId") || ""
      this.loadJobDetails()
    })
  }

  loadJobDetails(): void {
    this.recruiterService.getJobById(this.jobId).subscribe((data) => {
      this.job = data;
      this.isedit = true;
      this.skillsInput = data["Candidate Preference"]["Skill Set"];
    })
  }

  createJob() {
    // Convert comma-separated skills to array
    this.job["Candidate Preference"]["Skill Set"] = this.skillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)

    // Add additional properties needed for the job listing
    const jobToCreate = {
      ...this.job,
      status: this.jobStatus,
      deadline: this.applicationDeadline,
    }

    this.recruiterService.createJob(jobToCreate).subscribe(
      (createdJob) => {
        console.log("Job created successfully:", createdJob)
        this.router.navigate(["/recruiter/jobs"])
      },
      (error) => {
        console.error("Error creating job:", error)
      },
    )
  }

  cancel() {
    this.router.navigate(["/recruiter/jobs"])
  }
}

