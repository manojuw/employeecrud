import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JobType } from 'src/app/shared/model/jobType-model';

@Component({
	selector: 'app-filter',
	templateUrl: 'filter.component.html',
	styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {
	@Input() columns:Array<any>=[]
	@Output() onFilterChange:EventEmitter<any> = new EventEmitter<any>();
	@Output() handleResetFilter:EventEmitter<any> = new EventEmitter<any>();
	searchText:string=''
	ngOnInit() { 
	}

	onFilter(){
		this.onFilterChange.emit(this.columns);
	}

	resetFilter(){
        this.handleResetFilter.emit(this.columns);
    }
}