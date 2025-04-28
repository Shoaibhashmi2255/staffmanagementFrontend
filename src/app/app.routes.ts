import { Routes } from '@angular/router';
import { StaffListComponent } from './staff/staff-list/staff-list.component';
import { StaffProfileComponent } from './staff/staff-profile/staff-profile.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentComponent } from './department/department/department.component';

export const routes: Routes = [

    {
        path:'',
        component: StaffListComponent
    },
    {
        path:'staff-profile',
        component: StaffProfileComponent
    },
    {
        path:'staff-profile/:id',
        component: StaffProfileComponent
    },
    {
        path:'department',
        component: DepartmentListComponent
    },
    {
        path:'department/profile',
        component: DepartmentComponent
    },

];
