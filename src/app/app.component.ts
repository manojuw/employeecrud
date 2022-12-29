import { Component, OnInit } from '@angular/core';
import { ModalService } from './shared/modal/modal.service';

import { EmployeeModel } from './shared/model/employee-model';

import { JobType } from './shared/model/jobType-model';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  filterObject: any;

  employees: Array<EmployeeModel> = [];

  jobTypes: Array<JobType> = [];
  selectedEmployee: EmployeeModel=new EmployeeModel();
  filterColumns: Array<any> = [];

  constructor(private modalService: ModalService) {
    
    this.employees = [
      {
        serialNumber: 1,
        employeeName: 'Deepak',
        jobTitle: 'Sr Developer',
        age: 30,
        startDate: new Date(),
        endDate: new Date(),
      },

      {
        serialNumber: 2,
        employeeName: 'Shashank',
        jobTitle: 'Sr Developer',
        age: 30,
        startDate: new Date(),
        endDate: new Date(),
      },

      {
        serialNumber: 3,
        employeeName: 'Ankit',
        jobTitle: 'Trainee Er',
        age: 30,
        startDate: new Date(),
        endDate: new Date(),
      },

      {
        serialNumber: 4,
        employeeName: 'Amit',
        jobTitle: 'Sr Developer',
        age: 30,
        startDate: new Date(),
        endDate: new Date(),
      },

      {
        serialNumber: 5,
        employeeName: 'Harshit',
        jobTitle: 'Developer',
        age: 79,
        startDate: new Date(),
        endDate: new Date(),
      },

      {
        serialNumber: 6,
        employeeName: 'Manoj',
        jobTitle: 'Architect',
        age: 30,
        startDate: new Date(),
        endDate: new Date(),
      },

      {
        serialNumber: 7,
        employeeName: 'Aashish',
        jobTitle: 'Sr Developer',
        age: 30,
        startDate: new Date(),
        endDate: new Date(),
      },

      {
        serialNumber: 8,
        employeeName: 'Abhishek',
        jobTitle: 'Sr Developer',
        age: 30,
        startDate: new Date(),
        endDate: new Date(),
      },
    ];
  }

  ngOnInit() {
    this.initializeJobTypes();

    this.initializeColumns();
  }

  initializeJobTypes() {
    // Fetch here from database 
    this.jobTypes = [
      { uId: '', name: 'All' },
      { uId: 'Sr Developer', name: 'Sr Developer' },
      { uId: 'Trainee Er', name: 'Trainee Er' },
      { uId: 'Developer', name: 'Developer' },
      { uId: 'Architect', name: 'Architect' },
      { uId: 'Quality Analyst', name: 'Quality Analyst' },
    ];
  }

  initializeColumns() {
    this.filterColumns = [
      { displayName: '#', isFilterRequired: false, dataType: 'none' },

      {
        displayName: 'employeeName',
        isFilterRequired: true,
        dataType: 'string',
        selectedValue: '',
      },

      {
        displayName: 'jobTitle',
        isFilterRequired: true,
        dataType: 'select',
        values: this.jobTypes,
        selectedValue: '',
      },

      {
        displayName: 'age',
        isFilterRequired: true,
        dataType: 'number',
        selectedValue: '',
      },

      {
        displayName: 'startDate',
        isFilterRequired: true,
        dataType: 'date',
        selectedValue: '',
      },

      {
        displayName: 'endDate',
        isFilterRequired: true,
        dataType: 'date',
        selectedValue: '',
      },

      {
        displayName: 'action',
        isFilterRequired: true,
        dataType: 'action',
        selectedValue: '',
      },
    ];
  }



  onFilterChange(event: any) {
    let empFilter: any = {};

    this.filterColumns.forEach((column) => {
      if (column.selectedValue) {
        empFilter[column.displayName] = column.selectedValue;
      }
    });

    this.filterObject = empFilter;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.selectedEmployee = new EmployeeModel();

  }
  onEdit(employee: EmployeeModel) {
    this.selectedEmployee = employee;
    this.openModal('custom-modal-1');
  }

  onEmployeeSave(employee: EmployeeModel) {
    if (!employee.serialNumber) { this.addEmployee(employee); }
    else { this.updateEmployee(employee); }
  }

  addEmployee(employee: EmployeeModel) {

    employee.serialNumber = this.employees.length + 1;
    this.employees =[...this.employees , employee]
    this.closeModal('custom-modal-1');

  }

  handleResetFilter(event : any) {
    this.initializeColumns();
    this.onFilterChange(event);
  }


  updateEmployee(employee: EmployeeModel) {
    const index = this.employees.indexOf(this.selectedEmployee);
    this.employees[index].employeeName = employee.employeeName;
    this.employees[index].age= employee.age;
    this.employees[index].jobTitle= employee.jobTitle;
    this.employees[index].startDate= employee.startDate;
    this.employees[index].endDate= employee.endDate;
    this.closeModal('custom-modal-1');
  }

  deleteEmployee(employee:EmployeeModel){
    this.employees = this.employees.filter((emp)=>{return emp.serialNumber !== employee.serialNumber});

  }
}
