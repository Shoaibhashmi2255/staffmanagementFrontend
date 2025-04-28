import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../services/department.service'; // Assuming you have a department service
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-staff-profile',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css'] // Corrected to 'styleUrls'
})
export class StaffProfileComponent implements OnInit {
  employeeId: string | any = null; // Using string | null since route params are always strings
  employeeData: any = {}; // Will store employee details from the backend
  departments: any[] = []; // To store department list for lookup
  selectedFile: File | null = null; // Store the selected file

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService, // Inject department service
    private http: HttpClient // Inject HttpClient for making API requests

  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id'); // Get employee ID from route params

    // Fetch employee details based on employeeId
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(data => {
        this.employeeData = data;
        console.log('Employee loaded:', this.employeeData);
      });
    }

    // Fetch departments for reference (if needed)
    this.departmentService.getAllDepartment().subscribe(data => {
      this.departments = data;
    });
  }

  // Function to get department name based on departmentId
  getDepartmentName(departmentId: string | null): string {
    const department = this.departments.find(d => d.id === departmentId);
    return department ? department.name : 'Unknown Department';
  }

  // When Save button clicked
  saveEmployee() {
    if (this.employeeId) {
      // Update employee
      this.employeeService.updateEmployee(this.employeeId, this.employeeData).subscribe(response => {
        if (this.selectedFile) {
          this.uploadPhoto(this.employeeId); // Upload photo if it's selected
        }
        alert('Employee saved successfully!');
      }, error => {
        console.error('Error updating employee', error);
        alert('Failed to save employee.');
      });
    } else {
      // Create new employee
      this.employeeService.addEmployee(this.employeeData).subscribe(response => {
        if (this.selectedFile) {
          this.uploadPhoto(response.id); // Upload photo for the newly created employee
        }
        alert('Employee created successfully!');
      }, error => {
        console.error('Error creating employee', error);
        alert('Failed to create employee.');
      });
    }
  }

  // Refresh the form by reloading the page
  refreshForm() {
    window.location.reload();
  }

   // Handle file input change event
   onFileChange(event: any) {
    this.selectedFile = event.target.files[0]; // Get the selected file
  }

  // Upload photo to the server
  uploadPhoto(employeeId: string) {
    const formData = new FormData();
    formData.append('photo', this.selectedFile!); // Append selected file to FormData

    this.http.post(`your-api-endpoint/upload-photo/${employeeId}`, formData).subscribe(
      response => {
        console.log('Photo uploaded successfully!', response);
      },
      error => {
        console.error('Error uploading photo', error);
      }
    );
  }
}
