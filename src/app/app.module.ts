import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { FeaturedCompaniesComponent } from './components/featured-companies/featured-companies.component';
import { HttpClientModule } from '@angular/common/http';
import { MatchScoreComponent } from './components/match-score/match-score.component';
import { OpportunitiesComponent } from './pages/candidate-dashboard/opportunities/opportunities.component';
import { ProfileComponent } from './pages/candidate-dashboard/profile/profile.component';
import { CandidateDashboardComponent } from './pages/candidate-dashboard/candidate-dashboard.component';
import { DashboardHomeComponent } from './pages/candidate-dashboard/dashboard-home.component';
import { DashboardLayoutComponent } from './pages/candidate-dashboard/dashboard-layout.component';
import { DashboardNavbarComponent } from './pages/candidate-dashboard/dashboard-sidebar.component';
import { HomeComponent } from './pages/Home/home.component';
import { AuthService } from './services/auth.service';
import { CompanyService } from './services/company.service';
import { CandidateDetailsComponent } from './pages/recruiter-dashboard/candidate-details/candidate-details.component';
import { CreateJobComponent } from './pages/recruiter-dashboard/create-job/create-job.component';
import { RecruiterJobsComponent } from './pages/recruiter-dashboard/jobs/recruiter-jobs.component';
import { MatchedCandidatesComponent } from './pages/recruiter-dashboard/matched-candidates/matched-candidates.component';
import { RecruiterDashboardComponent } from './pages/recruiter-dashboard/recruiter-dashboard.component';
import { ShortlistedCandidatesComponent } from './pages/recruiter-dashboard/shortlisted/shortlisted-candidates.component';
import { RecruiterLoginComponent } from './pages/auth/recruiter-login/recruiter-login.component';
import { ApplicationsComponent } from './pages/candidate-dashboard/Applications/applications.component';
import { SavedJobsComponent } from './pages/candidate-dashboard/saved-jobs/saved-jobs.candidate.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SavedJobsComponent,
    ApplicationsComponent,
    RecruiterLoginComponent,
    CandidateDetailsComponent,
    CreateJobComponent,
    RecruiterJobsComponent,
    MatchedCandidatesComponent,
    ShortlistedCandidatesComponent,
    RecruiterDashboardComponent,
    FeaturedCompaniesComponent,
    JobCardComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchPageComponent,
    SearchFiltersComponent,
    LoginComponent,
    SignupComponent,
    JobDetailsComponent,
    CompanyPageComponent,
    MatchScoreComponent,
    OpportunitiesComponent,
    ProfileComponent,
    DashboardNavbarComponent,
    DashboardLayoutComponent,
    DashboardHomeComponent,
    CandidateDashboardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
