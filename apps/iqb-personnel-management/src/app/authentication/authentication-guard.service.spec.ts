import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationGuardService } from './authentication-guard.service';

describe('AuthenticationGuardService', () => {
  let service: AuthenticationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(AuthenticationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
