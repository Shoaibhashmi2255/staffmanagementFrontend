import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiURL = "http://localhost:5111/api/employees";

  constructor(private http: HttpClient) { }

  // ✅ Get all employees
  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }

  // ✅ Get employee by ID
  getEmployeeById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  // ✅ Add new employee
  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiURL, employee);
  }

  // ✅ Update employee
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${id}`, employee);
  }

  // ✅ Delete employee
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  
  searchEmployees(filters: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      params = params.append(key, filters[key]);
    });

    return this.http.get<any>(`${this.apiURL}/search`, { params });
  }
  
}
