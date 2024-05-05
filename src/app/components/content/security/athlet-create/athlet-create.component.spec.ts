import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletCreateComponent } from './athlet-create.component';

describe('AthletCreateComponent', () => {
  let component: AthletCreateComponent;
  let fixture: ComponentFixture<AthletCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AthletCreateComponent]
    });
    fixture = TestBed.createComponent(AthletCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
