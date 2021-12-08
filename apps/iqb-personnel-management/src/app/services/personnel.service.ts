/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreatePersonDto, PersonDto, UpdatePersonDto } from '@personnel/iqb-personnel-dtos';

@Injectable()
export class PersonnelService {
  private readonly url: string = 'iqb-personnel-api/person';

  constructor(private http: HttpClient) {}

  create(person: CreatePersonDto): Observable<PersonDto> {
    return this.http
      .post<PersonDto>(this.url, person)
      .pipe(catchError(PersonnelService.handleError));
  }

  read(): Observable<PersonDto[]> {
    return this.http
      .get<PersonDto[]>(this.url)
      .pipe(catchError(PersonnelService.handleError));
  }

  readById(id: string): Observable<PersonDto> {
    return this.http
      .get<PersonDto>(`${this.url}/${id}`)
      .pipe(catchError(PersonnelService.handleError));
  }

  update(id: string, updatePersonDto: UpdatePersonDto): Observable<PersonDto> {
    return this.http
      .patch<PersonDto>(`${this.url}/${id}`, updatePersonDto)
      .pipe(catchError(PersonnelService.handleError));
  }

  delete(id: string): Observable<PersonDto> {
    return this.http
      .delete<PersonDto>(`${this.url}/${id}`)
      .pipe(catchError(PersonnelService.handleError));
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
