import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PersonnelService } from './personnel.service';

describe('PersonnelService', () => {
  let service: PersonnelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonnelService, HttpClient, HttpHandler],
    });
    service = TestBed.inject(PersonnelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
