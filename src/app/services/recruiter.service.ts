import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject,  Observable, of } from "rxjs"
import  { Router } from "@angular/router"

@Injectable({
  providedIn: "root",
})
export class RecruiterService {
  private apiUrl = "api/recruiter"
  private currentRecruiterSubject = new BehaviorSubject<any>(null)
  public currentRecruiter$ = this.currentRecruiterSubject.asObservable()

  // Mock data for demonstration
  private mockJobs = [
    {
      id: "1",
      "Job Profile": "Frontend Developer",
      Name: "Frontend Developer - Level 2",
      Description: "We are looking for a talented Frontend Developer to join our team...",
      Role: "Frontend Developer",
      Location: "San Francisco, CA",
      "Work Mode": "Remote",
      "No of openings": 3,
      "Job ": "Full-time",
      Department: "Engineering",
      "Candidate Preference": {
        "Skill Set": ["JavaScript", "React", "CSS", "HTML", "Script"],
        Experience: "2-5 years",
        "Education Details": "Bachelor's degree in Computer Science or related field",
        "Notice Period": "30 days",
        "Salary Range": "$80,000 - $120,000 per annum",
      },
      status: "Active",
      postedDate: "2023-03-01",
      deadline: "2023-04-01",
      matchedCandidates: 12,
    },
    {
      id: "2",
      "Job Profile": "Backend Developer",
      Name: "Backend Developer - Level 3",
      Description: "We are seeking an experienced Backend Developer...",
      Role: "Backend Developer",
      Location: "New York, NY",
      "Work Mode": "Hybrid",
      "No of openings": 2,
      "Job ": "Full-time",
      Department: "Engineering",
      "Candidate Preference": {
        "Skill Set": ["Java", "Spring Boot", "MySQL", "AWS"],
        Experience: "3-7 years",
        "Education Details": "Bachelor's or Master's degree in Computer Science",
        "Notice Period": "60 days",
        "Salary Range": "$90,000 - $140,000 per annum",
      },
      status: "Active",
      postedDate: "2023-03-05",
      deadline: "2023-04-05",
      matchedCandidates: 8,
    },
    {
      id: "3",
      "Job Profile": "UI/UX Designer",
      Name: "UI/UX Designer - Level 2",
      Description: "We are looking for a creative UI/UX Designer...",
      Role: "Designer",
      Location: "Remote",
      "Work Mode": "Remote",
      "No of openings": 1,
      "Job ": "Full-time",
      Department: "Design",
      "Candidate Preference": {
        "Skill Set": ["Figma", "Adobe XD", "Sketch", "User Research"],
        Experience: "2-5 years",
        "Education Details": "Degree in Design, HCI, or related field",
        "Notice Period": "30 days",
        "Salary Range": "$75,000 - $110,000 per annum",
      },
      status: "Draft",
      postedDate: "2023-03-10",
      deadline: "2023-04-10",
      matchedCandidates: 5,
    },
  ]

  // Updated mock candidates with new data structure
  private mockCandidates = [
    {
      id: "1",
      "Personal Details": {
        Name: "John Smith",
        Email: "john.smith@example.com",
        "Mobile Phone": "+1 555-123-4567",
        Address: "San Francisco, CA",
      },
      "Professional Details": {
        "Current Location": "San Francisco, CA",
        Experience: "4 years",
        "Current Role": "Frontend Developer",
        "Current CTC": "$95,000 per annum",
        "Current Company": "Tech Solutions Inc.",
        "Current Industry": "Technology",
        "Education Details": "BS Computer Science, Stanford University",
        Skills: ["JavaScript", "React", "CSS", "HTML", "Script"],
        "Current Notice Period": "30 days",
        "Social Media": "linkedin.com/in/johnsmith",
      },
      matchScore: 92,
      shortlisted: false,
      jobId: "1",
      jobTitle: "Frontend Developer",
      avatar: "https://avatar.iran.liara.run/public/40",
      resume: "john_smith_resume.pdf",
    },
    {
      id: "2",
      "Personal Details": {
        Name: "Emily Johnson",
        Email: "emily.johnson@example.com",
        "Mobile Phone": "+1 555-987-6543",
        Address: "San Francisco, CA",
      },
      "Professional Details": {
        "Current Location": "San Francisco, CA",
        Experience: "3 years",
        "Current Role": "Frontend Developer",
        "Current CTC": "$85,000 per annum",
        "Current Company": "WebTech",
        "Current Industry": "Technology",
        "Education Details": "BS Computer Science, UC Berkeley",
        Skills: ["JavaScript", "React", "Redux", "Node.js"],
        "Current Notice Period": "45 days",
        "Social Media": "linkedin.com/in/emilyjohnson",
      },
      matchScore: 85,
      shortlisted: true,
      jobId: "1",
      jobTitle: "Frontend Developer",
      avatar: "https://avatar.iran.liara.run/public/73",
      resume: "emily_johnson_resume.pdf",
    },
    {
      id: "3",
      "Personal Details": {
        Name: "Michael Brown",
        Email: "michael.brown@example.com",
        "Mobile Phone": "+1 555-456-7890",
        Address: "New York, NY",
      },
      "Professional Details": {
        "Current Location": "New York, NY",
        Experience: "5 years",
        "Current Role": "Backend Developer",
        "Current CTC": "$110,000 per annum",
        "Current Company": "DataSys",
        "Current Industry": "Technology",
        "Education Details": "MS Computer Science, NYU",
        Skills: ["Java", "Spring Boot", "MySQL", "AWS", "Docker"],
        "Current Notice Period": "60 days",
        "Social Media": "linkedin.com/in/michaelbrown",
      },
      matchScore: 95,
      shortlisted: false,
      jobId: "2",
      jobTitle: "Backend Developer",
      avatar: "https://avatar.iran.liara.run/public/32",
      resume: "michael_brown_resume.pdf",
    },
    {
      id: "4",
      "Personal Details": {
        Name: "Sarah Wilson",
        Email: "sarah.wilson@example.com",
        "Mobile Phone": "+1 555-789-0123",
        Address: "Chicago, IL",
      },
      "Professional Details": {
        "Current Location": "Chicago, IL",
        Experience: "6 years",
        "Current Role": "Senior Backend Developer",
        "Current CTC": "$125,000 per annum",
        "Current Company": "Enterprise Solutions",
        "Current Industry": "Technology",
        "Education Details": "BS Computer Engineering, University of Illinois",
        Skills: ["Java", "Spring", "Hibernate", "PostgreSQL", "Kubernetes"],
        "Current Notice Period": "30 days",
        "Social Media": "linkedin.com/in/sarahwilson",
      },
      matchScore: 88,
      shortlisted: true,
      jobId: "2",
      jobTitle: "Backend Developer",
      avatar: "https://avatar.iran.liara.run/public/69",
      resume: "sarah_wilson_resume.pdf",
    },
    {
      id: "5",
      "Personal Details": {
        Name: "Widisha Pingle",
        Email: "usrivastava@example.org",
        "Mobile Phone": "+91 8898931432",
        Address: "Bijapur, India",
      },
      "Professional Details": {
        "Current Location": "Tenali, India",
        Experience: "5 years",
        "Current Role": "QA Engineer",
        "Current CTC": "12,00,000 per annum",
        "Current Company": "Swamy-Singhal",
        "Current Industry": "IT",
        "Education Details": "BTech/BE in Computer Science",
        Skills: ["Selenium", "Test Automation", "JIRA", "Manual Testing", "Postman"],
        "Current Notice Period": "26 days",
        "Social Media": "linkedin.com/in/xdeshpande",
      },
      matchScore: 90,
      shortlisted: false,
      jobId: "3",
      jobTitle: "UX/UI Designer",
      avatar: "https://avatar.iran.liara.run/public/92",
      resume: "widisha_pingle_resume.pdf",
    },
  ]

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // Check if recruiter is already logged in
    const recruiter = localStorage.getItem("currentRecruiter")
    if (recruiter) {
      this.currentRecruiterSubject.next(JSON.parse(recruiter))
    }
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    // Simulate API call
    const recruiter = {
      id: "1",
      name: "Recruiter Admin",
      email: email,
      company: "Keka HR",
      token: "fake-jwt-token",
    }

    if (rememberMe) {
      localStorage.setItem("currentRecruiter", JSON.stringify(recruiter))
    } else {
      sessionStorage.setItem("currentRecruiter", JSON.stringify(recruiter))
    }

    this.currentRecruiterSubject.next(recruiter)
    this.router.navigate(["/recruiter"])
    return of(recruiter)
  }

  logout(): void {
    localStorage.removeItem("currentRecruiter")
    sessionStorage.removeItem("currentRecruiter")
    this.currentRecruiterSubject.next(null)
    this.router.navigate(["/home/search"])
  }

  getRecruiterJobs(): Observable<any[]> {
    // In a real app, this would call the API
    return of(this.mockJobs)
  }

  getJobById(id: string): Observable<any> {
    // In a real app, this would call the API
    const job = this.mockJobs.find((job) => job.id === id)
    return of(job)
  }

  createJob(job: any): Observable<any> {
    // In a real app, this would call the API
    const newJob = {
      ...job,
      id: (this.mockJobs.length + 1).toString(),
      postedDate: new Date().toISOString(),
      matchedCandidates: 0,
    }

    this.mockJobs.push(newJob)
    return of(newJob)
  }

  updateJobStatus(jobId: string, status: string): Observable<any> {
    // In a real app, this would call the API
    const job = this.mockJobs.find((job) => job.id === jobId)
    if (job) {
      job.status = status
    }
    return of(job)
  }

  getMatchedCandidates(jobId: string): Observable<any[]> {
    // In a real app, this would call the API
    return of(this.mockCandidates.filter((candidate) => candidate.jobId === jobId))
  }

  shortlistCandidate(jobId: string, candidateId: string): Observable<any> {
    // In a real app, this would call the API
    const candidate = this.mockCandidates.find((c) => c.id === candidateId)
    if (candidate) {
      candidate.shortlisted = true
    }
    return of({ success: true })
  }

  shortlistAllCandidates(jobId: string): Observable<any> {
    // In a real app, this would call the API
    this.mockCandidates.forEach((candidate) => {
      if (candidate.jobId === jobId) {
        candidate.shortlisted = true
      }
    })
    return of({ success: true })
  }

  getShortlistedCandidates(): Observable<any[]> {
    // In a real app, this would call the API
    return of(this.mockCandidates.filter((candidate) => candidate.shortlisted))
  }

  removeFromShortlist(jobId: string, candidateId: string): Observable<any> {
    // In a real app, this would call the API
    const candidate = this.mockCandidates.find((c) => c.id === candidateId)
    if (candidate) {
      candidate.shortlisted = false
    }
    return of({ success: true })
  }

  getCandidateById(id: string): Observable<any> {
    // In a real app, this would call the API
    const candidate = this.mockCandidates.find((c) => c.id === id)
    return of(candidate)
  }

  get currentRecruiterValue(): any {
    return this.currentRecruiterSubject.value
  }

  isLoggedIn(): boolean {
    return !!this.currentRecruiterValue
  }
}

