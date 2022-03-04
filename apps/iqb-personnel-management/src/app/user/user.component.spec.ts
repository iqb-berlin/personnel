import { Observable } from 'rxjs';
import { UserDto } from '@personnel/iqb-personnel-dtos';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from '../services/user.service';
import { UserComponent } from './user.component';

jest.mock('../services/user.service');
const userService = UserService as jest.MockedClass<typeof UserService>;

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, UserService],
      declarations: [UserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    const expectedUsers: Observable<UserDto[]> = new Observable<UserDto[]>();
    userService.prototype.read.mockImplementation(
      (): Observable<UserDto[]> => {
        return expectedUsers;
      }
    );

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
