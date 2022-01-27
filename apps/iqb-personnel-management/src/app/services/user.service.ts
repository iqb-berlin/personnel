import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreateUserDto, UpdateUserDto, UserDto } from '@personnel/iqb-personnel-dtos';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url: string = 'iqb-personnel-api/user';

  constructor(private http: HttpClient) {
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
    return throwError(() => new Error(
      'Something bad happened; please try again later.')
    );
  }

  create(user: CreateUserDto): Observable<UserDto> {
    return this.http
      .post<UserDto>(this.url, user)
      .pipe(catchError(UserService.handleError));
  }

  read(): Observable<UserDto[]> {
    return this.http
      .get<UserDto[]>(this.url)
      .pipe(catchError(UserService.handleError));
  }

  readById(id: string): Observable<UserDto> {
    return this.http
      .get<UserDto>(`${this.url}/id/${id}`)
      .pipe(catchError(UserService.handleError));
  }

  readByName(name: string): Observable<UserDto> {
    return this.http
      .get<UserDto>(`${this.url}/name/${name}`)
      .pipe(catchError(UserService.handleError));
  }

  update(id: string, updateUserDto: UpdateUserDto): Observable<UserDto> {
    return this.http
      .patch<UserDto>(`${this.url}/${id}`, updateUserDto)
      .pipe(catchError(UserService.handleError));
  }

  delete(id: string): Observable<UserDto> {
    return this.http
      .delete<UserDto>(`${this.url}/${id}`)
      .pipe(catchError(UserService.handleError));
  }
}
