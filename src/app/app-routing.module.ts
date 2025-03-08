import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { OpportunitiesComponent } from './pages/candidate-dashboard/opportunities/opportunities.component';
import { ProfileComponent } from './pages/candidate-dashboard/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { CompaniesComponent } from './pages/companies/companies.component';
import { DashboardLayoutComponent } from './pages/candidate-dashboard/dashboard-layout.component';
import { HomeComponent } from './pages/Home/home.component';
import { DashboardHomeComponent } from './pages/candidate-dashboard/dashboard-home.component';
import { RecruiterLoginComponent } from './pages/auth/recruiter-login/recruiter-login.component';
import { RecruiterJobsComponent } from './pages/recruiter-dashboard/jobs/recruiter-jobs.component';
import { CandidateDetailsComponent } from './pages/recruiter-dashboard/candidate-details/candidate-details.component';
import { CreateJobComponent } from './pages/recruiter-dashboard/create-job/create-job.component';
import { MatchedCandidatesComponent } from './pages/recruiter-dashboard/matched-candidates/matched-candidates.component';
import { ShortlistedCandidatesComponent } from './pages/recruiter-dashboard/shortlisted/shortlisted-candidates.component';
import { RecruiterAuthGuard } from './guard/recruiter-auth.guard';
import { RecruiterDashboardComponent } from './pages/recruiter-dashboard/recruiter-dashboard.component';
import { ApplicationsComponent } from './pages/candidate-dashboard/Applications/applications.component';
import { SavedJobsComponent } from './pages/candidate-dashboard/saved-jobs/saved-jobs.candidate.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      { path: 'companies', component: CompaniesComponent },
      {
        path: 'recruiterlogin',
        component: RecruiterLoginComponent,
      },
    ],
  },

  {
    path: 'company/:id',
    component: CompanyPageComponent,
  },
  {
    path: 'job/:id',
    component: JobDetailsComponent,
  },

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
      },
      {
        path: 'opportunities',
        component: OpportunitiesComponent,
      },
      {
        path: 'saved-jobs',
        component: SavedJobsComponent,
      }
    ],
  },
  {
    path: 'recruiter',
    component : RecruiterDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'jobs',
        pathMatch: 'full',
      },
      {
        path: 'jobs',
        component: RecruiterJobsComponent,
      },
      {
        path:'create-job',
        component: CreateJobComponent,
      },
      {
        path: 'create-job/:jobId',
        component: CreateJobComponent,
      },
      {
        path: 'matched-candidates/:jobId',
        component: MatchedCandidatesComponent,
      },
      {
        path: 'shortlisted',
        component: ShortlistedCandidatesComponent,
      },
      {
        path: 'candidate/:id',
        component: CandidateDetailsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
