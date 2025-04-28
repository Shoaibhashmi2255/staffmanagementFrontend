import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../services/department.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-list',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent {
  employees: any[] = [];
  totalRecords = 0;
  pageNumber = 1;
  pageSize = 50;

  // Filters
  officeLocationFilter: string = '';
  departmentIdFilter: number | null = null;
  genderFilter: string = '';

  // Dropdown Options
  uniqueOfficeLocations: string[] = [];
  uniqueDepartments: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
  ) {}

  ngOnInit(): void {
    this.loadDropdownData();
    this.fetchEmployees();
  }

  loadDropdownData(): void {
    // Load all employees to extract unique office locations
    this.employeeService.getAllEmployees().subscribe(data => {
      this.uniqueOfficeLocations = [...new Set(data.map((e: any) => e.officelocation))];
    });

    // Load departments separately
    this.departmentService.getAllDepartment().subscribe(data => {
      this.uniqueDepartments = data;
    });
  }

  fetchEmployees(): void {
    const filters: any = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };

    if (this.officeLocationFilter) {
      filters.officeLocation = this.officeLocationFilter;
    }
    if (this.departmentIdFilter !== null) {
      filters.departmentId = this.departmentIdFilter;
    }
    if (this.genderFilter) {
      filters.gender = this.genderFilter;
    }

    this.employeeService.searchEmployees(filters).subscribe(response => {
      this.employees = response.employees;
      this.totalRecords = response.totalRecords;

      // Map department name to employees
      this.employees = this.employees.map(employee => {
        employee.departmentName = this.getDepartmentName(employee.departmentId);
        return employee;
      });
    }, error => {
      console.error('Error fetching employees:', error);
      this.employees = [];
      this.totalRecords = 0;
    });
  }

  applyFilters(): void {
    this.pageNumber = 1;
    this.fetchEmployees();
  }

  nextPage(): void {
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.fetchEmployees();
    }
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchEmployees();
    }
  }

  getDepartmentName(departmentId: number): string {
    const department = this.uniqueDepartments.find(dep => dep.departmentId === departmentId);
    return department ? department.departmentName : 'Unknown';
  }
}
