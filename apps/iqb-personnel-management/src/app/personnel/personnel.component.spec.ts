import { Observable } from 'rxjs';
import { PersonDto } from '@personnel/iqb-personnel-dtos';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelService } from '../services/personnel.service';
import { PersonnelComponent } from './personnel.component';

jest.mock('../services/personnel.service');
const personnelService = PersonnelService as jest.MockedClass<
  typeof PersonnelService
>;

describe('PersonnelComponent', () => {
  let component: PersonnelComponent;
  let fixture: ComponentFixture<PersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [PersonnelService],
      declarations: [PersonnelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    const expectedPersonnel: Observable<PersonDto[]> = new Observable<
      PersonDto[]
    >();
    personnelService.prototype.read.mockImplementation(
      (): Observable<PersonDto[]> => {
        return expectedPersonnel;
      }
    );

    fixture = TestBed.createComponent(PersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display as default empty greetings', () => {
    const fixture = TestBed.createComponent(PersonnelComponent);
    const component = fixture.componentInstance;

    expect(component.infoMessage).toEqual('');
  });
});
