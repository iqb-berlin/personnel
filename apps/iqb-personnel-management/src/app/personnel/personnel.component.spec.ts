import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelComponent } from './personnel.component';

describe('StaffComponent', () => {
  let component: PersonnelComponent;
  let fixture: ComponentFixture<PersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display as default empty greetings', () => {
    const fixture = TestBed.createComponent(PersonnelComponent);
    const app = fixture.componentInstance;

    expect(component.infoMessage).toEqual('');
  });
});
