import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, first, from, map, mergeMap, type Observable, of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class JobService {
  private apiUrl = "api/jobs"
  private httpClient : HttpClient;

  // Mock data for demonstration
  private mockJobs =  new BehaviorSubject<any>(null)

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.loadMockJobs();    
  }


  getJobs(): Observable<any[]> {
    // In a real app, this would call the API
    // return this.http.get<any[]>(this.apiUrl);

    // For demonstration, return mock data
    return this.mockJobs.asObservable()
  }

  getJobById(id: string): Observable<any> {
    // In a real app, this would call the API
    // return this.http.get<any>(`${this.apiUrl}/${id}`);
   
    // For demonstration, return mock data
    return this.getJobs().pipe(
      map(jobs => jobs.find(job => job.id === id)), 
      first()
    );
  }

  getJobByCompany(companyId: string): Observable<any[]> {
    return this.getJobs().pipe(
      map(jobs => jobs.filter(job => job.company.id === companyId))
    );
  }

  searchJobs(query: string, location: string): Observable<any[]> {
    // In a real app, this would call the API with search parameters
    // return this.http.get<any[]>(`${this.apiUrl}/search?q=${query}&location=${location}`);

    // For demonstration, filter mock data based on search query
    return this.getJobs().pipe(map(jobs => jobs.filter((job:any) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.name.toLowerCase().includes(query.toLowerCase()) ||
        job.skills.some((skill:any) => skill.toLowerCase().includes(query.toLowerCase()))

      const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase())

      return matchesQuery && matchesLocation
    })));
  }

  filterJobs(filters: any): Observable<any[]> {
    // In a real app, this would call the API with filter parameters
    // return this.http.get<any[]>(`${this.apiUrl}/filter`, { params: filters });

    // For demonstration, filter mock data based on filters

    return this.getJobs().pipe(map(jobs => {
    let filteredJobs = [...jobs]

    if (filters.experiences && filters.experiences.length > 0) {
      filteredJobs = filteredJobs.filter((job:any) =>
        filters.experiences.some((exp: string) => {

            const [filterMinYear, filterMaxYear] = exp.includes("+")
            ? [Number(exp.split("+")[0]), Number.MAX_VALUE]
            : exp.split("year")[0].split("-").map(Number);

            const [jobMinYear, jobMaxYear] = job.experience.includes("+")
            ? [Number(job.experience.split("+")[0]), Number.MAX_VALUE]
            : job.experience.split("year")[0].split("-").map(Number);
            return (
            (jobMinYear >= filterMinYear && jobMinYear < filterMaxYear) ||
            (jobMaxYear > filterMinYear && jobMaxYear < filterMaxYear) ||
            (jobMinYear < filterMinYear && jobMaxYear > filterMaxYear)
            );
        }),
      )
    }

    if (filters.skills && filters.skills.length > 0) {
      filteredJobs = filteredJobs.filter((job:any) => filters.skills.some((skill: string) => job.skills.includes(skill)))
    }

    if (filters.locations && filters.locations.length > 0) {
      filteredJobs = filteredJobs.filter((job:any) =>
        filters.locations.some((location: string) => job.location.includes(location)),
      )
    }

    if (filters.salary && (filters.salary.min || filters.salary.max)) {
      filteredJobs = filteredJobs.filter((job:any) => {
        const salaryRange = job.salary.replace(/[^0-9,-]/g, "").split("-")
        const minSalary = Number.parseInt(salaryRange[0].replace(",", ""))
        const maxSalary = Number.parseInt(salaryRange[1].replace(",", ""))

        const meetsMinSalary = !filters.salary.min || minSalary >= filters.salary.min
        const meetsMaxSalary = !filters.salary.max || maxSalary <= filters.salary.max

        return meetsMinSalary && meetsMaxSalary
      })
    }

    if (filters.jobTypes) {
      const selectedJobTypes = Object.keys(filters.jobTypes).filter((type) => filters.jobTypes[type])

      if (selectedJobTypes.length > 0) {
        filteredJobs = filteredJobs.filter((job:any) => {
          const jobType = job.jobType.toLowerCase()
          return selectedJobTypes.some((type) => jobType.includes(type.toLowerCase()))
        })
      }
    }

      return filteredJobs;
    }));    
  }

  sortJobs(sortBy: string): Observable<any[]> {
    // In a real app, this would call the API with sort parameters
    // return this.http.get<any[]>(`${this.apiUrl}/sort?by=${sortBy}`);

    // For demonstration, sort mock data
    return this.getJobs().pipe(map(jobs => {
      const sortedJobs = [...jobs]

      switch (sortBy) {
        case "date":
          // Sort by posted date (newest first)
          sortedJobs.sort((a:any, b:any) => {
            const dateA = this.parseDateString(a.postedDate)
            const dateB = this.parseDateString(b.postedDate)
            return dateA - dateB
          })
          break
        case "salary":
          // Sort by salary (highest first)
          sortedJobs.sort((a:any, b:any) => {
            const salaryRangeA = a.salary.replace(/[^0-9,-]/g, "").split("-")
            const salaryRangeB = b.salary.replace(/[^0-9,-]/g, "").split("-")
  
            const maxSalaryA = Number.parseInt(salaryRangeA[1].replace(",", ""))
            const maxSalaryB = Number.parseInt(salaryRangeB[1].replace(",", ""))
  
            return maxSalaryB - maxSalaryA
          })
          break
        case "relevance":
        default:
          // Default sorting (by relevance)
          break
      }

      return sortedJobs;
    }));   
  }

  getJobsByPage(page: number, itemsPerPage: number): Observable<any[]> {
    // In a real app, this would call the API with pagination parameters
    // return this.http.get<any[]>(`${this.apiUrl}?page=${page}&limit=${itemsPerPage}`);

    // For demonstration, paginate mock data
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return this.getJobs().pipe(map(jobs => jobs.slice(startIndex, endIndex)));
  }

  private parseDateString(dateString: string): number {
    // Convert date strings like "2 days ago" to timestamps for sorting
    const now = new Date().getTime()
    const day = 24 * 60 * 60 * 1000
    const week = 7 * day
    const month = 30 * day

    if (dateString.includes("day")) {
      const days = Number.parseInt(dateString.split(" ")[0])
      return now - days * day
    } else if (dateString.includes("week")) {
      const weeks = Number.parseInt(dateString.split(" ")[0])
      return now - weeks * week
    } else if (dateString.includes("month")) {
      const months = Number.parseInt(dateString.split(" ")[0])
      return now - months * month
    }

    return now
  }

  private loadMockJobs(){
    this.httpClient.get<any[]>('../assets/JSON/diverse_jobs.json').subscribe(data=>{
      this.mockJobs.next(data);
    });
  }
}

