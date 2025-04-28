import { Component } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-list',
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent {
  departments: any[] = []; // Store the list of departments

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartment().subscribe(
      (data) => {
        this.departments = data; // Store the fetched departments
        console.log(this.departments);
        
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }
}
