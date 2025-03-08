import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"
import  { RecruiterService } from "../../../services/recruiter.service"

@Component({
  selector: "app-recruiter-login",
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-bold text-gray-900">Recruiter Sign In</h2>
          <p class="mt-2 text-sm text-gray-600">
            Sign in to manage your job postings and candidates
          </p>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="login()">
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="mb-3">
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                [(ngModel)]="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type ="password"
                [(ngModel)]="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                [(ngModel)]="rememberMe"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-primary hover:text-primary-dark">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
            type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in
            </button>
          </div>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Not a recruiter? <a routerLink="/home/login" class="font-medium text-primary hover:text-primary-dark">Sign in as a candidate</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class RecruiterLoginComponent {
  email = ""
  password = ""
  rememberMe = false

  constructor(private recruiterService: RecruiterService) {}

  login(): void {
    this.recruiterService.login(this.email, this.password, this.rememberMe).subscribe(
      (success) => {
        console.log("Recruiter login successful")
      },
      (error) => {
        console.error("Recruiter login failed", error)
      },
    )
  }
}

