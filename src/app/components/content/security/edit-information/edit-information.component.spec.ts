import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInformationComponent } from './edit-information.component';

describe('EditInformationComponent', () => {
  let component: EditInformationComponent;
  let fixture: ComponentFixture<EditInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInformationComponent]
    });
    fixture = TestBed.createComponent(EditInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
