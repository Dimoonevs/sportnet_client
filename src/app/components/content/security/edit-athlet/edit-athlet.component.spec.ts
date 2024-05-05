import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAthletComponent } from './edit-athlet.component';

describe('EditAthletComponent', () => {
  let component: EditAthletComponent;
  let fixture: ComponentFixture<EditAthletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAthletComponent]
    });
    fixture = TestBed.createComponent(EditAthletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
