import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, first, map,  Observable, of } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  private apiUrl = "api/companies"
  private httpClient : HttpClient;

  // Mock data for demonstration
  private mockCompanies =  new BehaviorSubject<any>(null)

  /**
   *
   */
   constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.loadMockCompanies();
  }


   getCompanies(): Observable<any[]> {
    // In a real app, this would call the API
    // return this.http.get<any[]>(this.apiUrl);

    // For demonstration, return mock data
    return this.mockCompanies.asObservable()
  }

  getCompanyById(id: string): Observable<any> {
    // In a real app, this would call the API
    // return this.http.get<any>(`${this.apiUrl}/${id}`);

    // For demonstration, return mock data
    return this.getCompanies().pipe(
          map(companies => companies.find((company:any) => company.id === id),
          first()));
  }

  getFeaturedCompanies(): Observable<any[]> {
    // In a real app, this would call the API
    // return this.http.get<any[]>(`${this.apiUrl}/featured`);

    // For demonstration, return mock data
    return this.getCompanies();
  }

  getCompanyJobs(companyId: string): Observable<any[]> {
    // In a real app, this would call the API
    // return this.http.get<any[]>(`${this.apiUrl}/${companyId}/jobs`);

    // For demonstration, return mock data
    // This would typically return jobs specific to the company
    return of([])
  }

  getSimilarCompanies(companyId: string): Observable<any[]> {
    // In a real app, this would call the API
    // return this.http.get<any[]>(`${this.apiUrl}/${companyId}/similar`);

    // For demonstration, return mock data
    // This would typically return companies similar to the specified company

    return this.getCompanies().pipe(
      map(companies => {
        var company = companies.find((company:any) => company.id === companyId)
        if(company){
          return companies.filter((c:any) => c.id !== companyId && c.industry === company.industry)
          .slice(0, 3)
        }

        return [];
      }));
  }

  private loadMockCompanies(){
    this.httpClient.get<any[]>('../assets/JSON/unique_companies.json').subscribe(data=>{
      this.mockCompanies.next(data);
    });
  }
}

