import { Injectable } from "@angular/core"
import  { HttpClient, HttpHeaders } from "@angular/common/http"
import {  Observable, of, forkJoin } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import  { JobService } from "./job.service"
import { RecruiterService } from "./recruiter.service"

@Injectable({
  providedIn: "root",
})
export class JobMatchService {
  private matchingApiUrl = "https://as-scm-gae3atapetccdcgw.centralus-01.azurewebsites.net/Matching"

  constructor(
    private http: HttpClient,
    private jobService: RecruiterService,
  ) {}

  /**
   * Get jobs that match a candidate's profile
   * @param candidateId The ID of the candidate
   * @param maxCount Maximum number of matches to return
   * @param minMatchingPercent Minimum matching percentage threshold
   * @returns Observable of matched jobs with scores
   */
  getMatchedJobs(candidateId: string, maxCount = 10, minMatchingPercent = 50): Observable<any[]> {
    // In a real environment, use the API
    if (this.isRealEnvironment()) {
      const headers = new HttpHeaders({
              'Access-Control-Allow-Origin': '*'
            });
      const url = `${this.matchingApiUrl}/0/${candidateId}?maxCount=${maxCount}&minMatchingPercent=${minMatchingPercent}`

      return this.http.get<any[]>(url,{headers}).pipe(
        switchMap((matches) => {
          if (!matches || matches.length === 0) {
            return of([])
          }

          // Create an array of observables for each job detail request
          const jobRequests = matches.map((match) =>
            this.jobService.getJobById(match.id).pipe(
              map((job) => ({
                ...job,
                matchScore: match.matchPercentage,
              })),
            ),
          )

          // Wait for all requests to complete and return the combined result
          return forkJoin(jobRequests)
        }),
      )
    }

    // For demonstration, use mock data
    return this.simulateJobMatching()
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

  private simulateJobMatching(): Observable<any[]> {
    // This is a mock implementation. In a real app, this logic would be on the server.
    const mockJobs =   [
      { postedDate: "2023-03-01",
        id: 1,
        "Job Profile": "UI/UX Designer",
        "Name": "Data Scientist - Level 3",
        "Description": "Job description placeholder.",
        "Role": "Data Analyst",
        "Location": "Pune, India",
        "Work Mode": "Remote",
        "No of openings": 6,
        "Job Type": "Full-time",
        "Department": "Design",
        "Candidate Preference": {
          "Skill Set": [
            "AWS",
            "Docker",
            "Kubernetes",
            "CI/CD"
          ],
          "Experience": "10+ years",
          "Education Details": "MBA or equivalent in Project Management",
          "Notice Period": "60 days",
          "Salary Range": "\u20b920,00,000 - \u20b930,00,000 per annum"
        }
      },
      {id: 2,
        postedDate: "2023-03-05",
        "Job Profile": "Software Engineer",
        "Name": "Software Engineer - Level 1",
        "Description": "Job description placeholder.",
        "Role": "Project Lead",
        "Location": "Delhi, India",
        "Work Mode": "On-site",
        "No of openings": 4,
        "Job Type": "Full-time",
        "Department": "Design",
        "Candidate Preference": {
          "Skill Set": [
            "Agile",
            "Scrum",
            "JIRA",
            "Risk Management"
          ],
          "Experience": "1-3 years",
          "Education Details": "Diploma in UI/UX Design",
          "Notice Period": "15 days",
          "Salary Range": "\u20b920,00,000 - \u20b930,00,000 per annum"
        }
      },
      {
        id:3,
        postedDate: "2023-03-10",
        "Job Profile": "Software Engineer",
        "Name": "UI/UX Designer - Level 3",
        "Description": "Job description placeholder.",
        "Role": "Infrastructure Engineer",
        "Location": "Pune, India",
        "Work Mode": "Hybrid",
        "No of openings": 1,
        "Job Type": "Contract",
        "Department": "Infrastructure",
        "Candidate Preference": {
          "Skill Set": [
            "JavaScript",
            "React",
            "Node.js",
            "MongoDB"
          ],
          "Experience": "10+ years",
          "Education Details": "Master's degree in Data Science",
          "Notice Period": "Immediate",
          "Salary Range": "\u20b912,00,000 - \u20b918,00,000 per annum"
        }
      },
      {
        id:4,
        postedDate: "2023-03-15",
        "Job Profile": "Software Engineer",
        "Name": "UI/UX Designer - Level 1",
        "Description": "Job description placeholder.",
        "Role": "Data Analyst",
        "Location": "Delhi, India",
        "Work Mode": "Remote",
        "No of openings": 8,
        "Job Type": "Full-time",
        "Department": "Infrastructure",
        "Candidate Preference": {
          "Skill Set": [
            "Figma",
            "Adobe XD",
            "Sketch",
            "User Research"
          ],
          "Experience": "8-10 years",
          "Education Details": "Master's degree in Data Science",
          "Notice Period": "15 days",
          "Salary Range": "\u20b95,00,000 - \u20b98,00,000 per annum"
        }
      },
    ]

    return of(mockJobs)
  }
}

