import { Injectable } from "@angular/core"
import  { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject,  Observable, of, forkJoin } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import  { Router } from "@angular/router"
import { transformJobProfile } from "../job-profile.utils"
import { transformCandidateProfile } from "../candidate-profile.utils"

@Injectable({
  providedIn: "root",
})
export class RecruiterService {
  private apiUrl = "api/recruiter"
  private matchingApiUrl = "https://as-scm-gae3atapetccdcgw.centralus-01.azurewebsites.net/Matching"
  private currentRecruiterSubject = new BehaviorSubject<any>(null)
  public currentRecruiter$ = this.currentRecruiterSubject.asObservable()

  // Mock data for demonstration
  private mockJobs :any;

  // Updated mock candidates with new data structure
  private mockCandidates :any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // Check if recruiter is already logged in
    const recruiter = localStorage.getItem("currentRecruiter")
    if (recruiter) {
      this.currentRecruiterSubject.next(JSON.parse(recruiter))
    }
    this.loadMockCandidates();
    this.loadMockJobs();
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
    const job = this.mockJobs.find((job:any) => job.id === id)

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
    const job = this.mockJobs.find((job:any) => job.id === jobId)
    if (job) {
      job.status = status
    }
    return of(job)
  }

  /**
   * Get candidates that match a job
   * @param jobId The ID of the job
   * @param maxCount Maximum number of matches to return
   * @param minMatchingPercent Minimum matching percentage threshold
   * @returns Observable of matched candidates with scores
   */
  getMatchedCandidates(jobId: string, maxCount = 10, minMatchingPercent = 80): Observable<any[]> {
    // In a real environment, use the API
    if (this.isRealEnvironment()) {
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      });
      const url = `${this.matchingApiUrl}/1/${jobId}?maxCount=${maxCount}&minMatchingPercent=${minMatchingPercent}`

      return this.http.get<any[]>(url,{headers}).pipe(
        switchMap((matches) => {
          if (!matches || matches.length === 0) {
            return of([])
          }

          // Create an array of observables for each candidate detail request
          const candidateRequests = matches.map((match) =>
            this.getCandidateById(match.id).pipe(
              map((candidate) => ({
                ...candidate,
                matchScore: match.matchPercentage,
                jobId: jobId,
                jobTitle: this.getJobTitleById(jobId),
              })),
            ),
          )

          // Wait for all requests to complete and return the combined result
          return forkJoin(candidateRequests)
        }),
      )
    }

    // For demonstration, filter mock candidates by jobId
    return of(this.mockCandidates.filter((candidate:any) => candidate.jobId === jobId))
  }

  shortlistCandidate(jobId: string, candidateId: string): Observable<any> {
    // In a real app, this would call the API
    const candidate = this.mockCandidates.find((c:any) => c.id === candidateId)
    if (candidate) {
      candidate.shortlisted = true
    }
    return of({ success: true })
  }

  shortlistAllCandidates(jobId: string): Observable<any> {
    // In a real app, this would call the API
    this.mockCandidates.forEach((candidate:any) => {
      if (candidate.jobId === jobId) {
        candidate.shortlisted = true
      }
    })
    return of({ success: true })
  }

  getShortlistedCandidates(): Observable<any[]> {
    // In a real app, this would call the API
    return of(this.mockCandidates.filter((candidate:any) => candidate.shortlisted))
  }

  removeFromShortlist(jobId: string, candidateId: string): Observable<any> {
    // In a real app, this would call the API
    const candidate = this.mockCandidates.find((c:any) => c.id === candidateId)
    if (candidate) {
      candidate.shortlisted = false
    }
    return of({ success: true })
  }

  getCandidateById(id: string): Observable<any> {
    // In a real app, this would call the API to fetch candidate details from JSON file
    const candidate = this.mockCandidates.find((c:any) => c.id === id)
    return of(candidate)
  }

  /**
   * Check if we're in a real environment where API calls should be made
   * This could be based on environment variables or other configuration
   */
  private isRealEnvironment(): boolean {
    // For demonstration purposes, return false
    // In a real app, this would check environment variables or other configuration
    return true
  }

  /**
   * Helper method to get job title by ID
   */
  private getJobTitleById(jobId: string): string {
    const job = this.mockJobs.find((j:any) => j.id === jobId)
    return job ? job.Name : "Unknown Job"
  }

  get currentRecruiterValue(): any {
    return this.currentRecruiterSubject.value
  }

  isLoggedIn(): boolean {
    return !!this.currentRecruiterValue
  }
  private loadMockJobs(){
    this.http.get<any[]>('../assets/JSON/jobs.json').subscribe(data=>{
      let temp:any = [];
      data.forEach((d:any) => {
        temp.push(transformJobProfile(d))
      })
      this.mockJobs = temp;
    });
  }
  private loadMockCandidates(){
    this.http.get<any[]>('../assets/JSON/candidates.json').subscribe(data=>{
      let temp:any = [];
      data.forEach((d:any) => {
        temp.push(transformCandidateProfile(d))
      })
      this.mockCandidates = temp;
    });
  }

}

