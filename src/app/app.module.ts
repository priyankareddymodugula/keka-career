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
import { EducationComponent } from './pages/candidate-dashboard/profile/education.component';
import { ExperienceComponent } from './pages/candidate-dashboard/profile/experience.component';
import { LinksComponent } from './pages/candidate-dashboard/profile/links.component';
import { PersonalInfoComponent } from './pages/candidate-dashboard/profile/personal-info.component';
import { ProfileComponent } from './pages/candidate-dashboard/profile/profile.component';
import { ResumeComponent } from './pages/candidate-dashboard/profile/resume.component';
import { SkillsComponent } from './pages/candidate-dashboard/profile/skills.component';
import { CandidateDashboardComponent } from './pages/candidate-dashboard/candidate-dashboard.component';
import { DashboardHomeComponent } from './pages/candidate-dashboard/dashboard-home.component';
import { DashboardLayoutComponent } from './pages/candidate-dashboard/dashboard-layout.component';
import { DashboardSidebarComponent } from './pages/candidate-dashboard/dashboard-sidebar.component';
import { AuthService } from './services/auth.service';
import { CompanyService } from './services/company.service';

@NgModule({
  declarations: [
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
    EducationComponent,
    PersonalInfoComponent,
    ExperienceComponent,
    LinksComponent,
    ProfileComponent,
    SkillsComponent,
    ResumeComponent,
    DashboardSidebarComponent,
    DashboardLayoutComponent,
    DashboardHomeComponent,
    CandidateDashboardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
