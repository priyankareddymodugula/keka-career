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
import { AuthService } from './services/auth.service';
import { CompanyService } from './services/company.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { FeaturedCompaniesComponent } from './components/featured-companies/featured-companies.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    FeaturedCompaniesComponent,JobCardComponent,  AppComponent,HeaderComponent,FooterComponent,SearchPageComponent,SearchFiltersComponent,LoginComponent,SignupComponent,JobDetailsComponent,CompanyPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule


  ],
  providers: [AuthService,CompanyService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
