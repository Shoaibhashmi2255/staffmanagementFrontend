import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiURL = "http://localhost:5111/api/department";

  constructor(private http: HttpClient) { }

  // ✅ Get all department
  getAllDepartment(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }

  // ✅ Get Department by ID
  getDepartmentById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  // ✅ Add new Department
  addDepartment(department: any): Observable<any> {
    return this.http.post<any>(this.apiURL, department);
  }

  // ✅ Update Department
  updateDepartment(id: number, department: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${id}`, department);
  }

  // ✅ Delete Department
  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

}
