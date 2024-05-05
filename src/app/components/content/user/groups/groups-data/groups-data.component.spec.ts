import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsDataComponent } from './groups-data.component';

describe('GroupsDataComponent', () => {
  let component: GroupsDataComponent;
  let fixture: ComponentFixture<GroupsDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsDataComponent]
    });
    fixture = TestBed.createComponent(GroupsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
