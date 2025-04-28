import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
 departmentId: number | any = null;
  departmentData: any = {}; // Will store department details from backend

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('id');

    if (this.departmentId) {
      this.departmentService.getDepartmentById(this.departmentId).subscribe(data => {
        this.departmentData = data;
        console.log('department loaded:', this.departmentData);
      });
    }
  }

  // When Save button clicked
  savedepartment() {
    if (this.departmentId) {
      this.departmentService.updateDepartment(this.departmentId, this.departmentData).subscribe(response => {
        console.log('department updated successfully!', response);
        alert('department saved successfully!');
      }, error => {
        console.error('Error updating department', error);
        alert('Failed to save department.');
      });
    } else {
      this.departmentService.addDepartment(this.departmentData).subscribe(response => {
        console.log('department created successfully!', response);
        alert('department created successfully!');
      }, error => {
        console.error('Error creating department', error);
        alert('Failed to create department.');
      });
    }
  }

  refreshForm() {
    window.location.reload(); // simply reloads the page
  }




}
