import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { EmployeeModel } from 'src/app/shared/model/employee-model';
import { JobType } from 'src/app/shared/model/jobType-model';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
	selector: 'employee',
	templateUrl: 'employee.component.html',
	styleUrls:['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
	/*------------------------------------------
  --------------------------------------------
  Declare Form
  --------------------------------------------
  --------------------------------------------*/
	employeeForm = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
		jobTitle: new FormControl('', [Validators.required]),
		age: new FormControl(0, [Validators.required]),
		startDate: new FormControl(this.formatDate(new Date()), [Validators.required]),
		endDate: new FormControl()

	});

	@Output() saveEmployee = new EventEmitter<EmployeeModel>();
	@Input() employeeModel: EmployeeModel = new EmployeeModel();
	jobTypes: Array<JobType> = [];
	/*------------------------------------------
	--------------------------------------------
	Created constructor
	--------------------------------------------
	--------------------------------------------*/
	constructor(private modelService:ModalService) { }

	ngOnInit(): void {
		this.initializeJobTypes();
		
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

	ngOnChanges(): void {
		if (this.employeeModel.serialNumber > 0) {
			this.employeeForm.setValue(
				{
					name: this.employeeModel.employeeName,
					jobTitle: this.employeeModel.jobTitle,
					age: this.employeeModel.age,
					startDate: this.formatDate(new Date(this.employeeModel.startDate)),
					endDate: this.formatDate(new Date(this.employeeModel.endDate)),

				}
			)
		}else{
			this.employeeForm.setValue(
				{
					name: '',
					jobTitle: '',
					age: 0,
					startDate:this.formatDate(new Date()),
					endDate: '',
	
				}
			)
		}
	}
	private formatDate(date:Date):string {
		const d = new Date(date);
		let month = '' + (d.getMonth() + 1);
		let day = '' + d.getDate();
		const year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	  }
	/**
	 * Write code on Method
	 *
	 * @return response()
	 */
	get f() {
		return this.employeeForm.controls;
	}

	closeModal(){
		this.modelService.close('custom-modal-1');
	}


	/**
	 * Write code on Method
	 *
	 * @return response()	
	 */
	submit() {

		const employee: EmployeeModel = new EmployeeModel();
		debugger
		employee.serialNumber = this.employeeModel.serialNumber;
		employee.employeeName = this.employeeForm.get('name')?.value;
		employee.age = Number(this.employeeForm.get('age')?.value);
		employee.jobTitle = this.employeeForm.get('jobTitle')?.value;
		employee.startDate = this.employeeForm.get('startDate')?.value ;
		employee.endDate = this.employeeForm.get('endDate')?.value;

		this.saveEmployee.emit(employee);

	}
}