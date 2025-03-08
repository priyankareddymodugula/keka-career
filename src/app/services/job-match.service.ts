import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import {  Observable, of } from "rxjs"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class JobMatchService {
  private apiUrl = "api/job-matches"

  constructor() {}

  getMatchedJobs(user: any): Observable<any[]> {
    // In a real application, you would send the user's profile to the server
    // and receive matched jobs with scores. Here, we'll simulate this process.
    return this.simulateJobMatching(user)
  }

  private simulateJobMatching(user: any): Observable<any[]> {
    // This is a mock implementation. In a real app, this logic would be on the server.
    const mockJobs = [
      {
        id: 1,
        title: "Frontend Developer",
        company: "TechCorp",
        location: "San Francisco, CA",
        postedDate: "2023-03-01",
      },
      { id: 2, title: "Backend Developer", company: "DataSys", location: "New York, NY", postedDate: "2023-03-05" },
      {
        id: 3,
        title: "Full Stack Developer",
        company: "WebSolutions",
        location: "Austin, TX",
        postedDate: "2023-03-10",
      },
      { id: 4, title: "UI/UX Designer", company: "DesignPro", location: "Seattle, WA", postedDate: "2023-03-15" },
      { id: 5, title: "Data Scientist", company: "AITech", location: "Boston, MA", postedDate: "2023-03-20" },
    ]

    return of(mockJobs).pipe(
      map((jobs) =>
        jobs.map((job) => ({
          ...job,
          matchScore: this.calculateMatchScore(user, job),
        })),
      ),
    )
  }

  private calculateMatchScore(user: any, job: any): number {
    // This is a simplified scoring algorithm. In a real AI-based system,
    // this would be much more complex and would likely use machine learning.
    let score = 0

    // Simulate matching based on job title
    if (user.skills && user.skills.toLowerCase().includes(job.title.toLowerCase())) {
      score += 50
    }

    // Simulate matching based on experience
    if (user.experience) {
      score += Math.min(user.experience * 5, 30) // Max 30 points for experience
    }

    // Add some randomness to simulate other factors
    score += Math.random() * 20

    // Ensure the score is between 0 and 100
    return Math.min(Math.round(score), 100)
  }
}

