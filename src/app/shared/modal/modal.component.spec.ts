import { TestBed, inject } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('a modal component', () => {
	let component: ModalComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ModalComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ModalComponent], (ModalComponent) => {
		component = ModalComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});