import { Observable, shareReplay, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  ChronoField,
  Instant,
  LocalDateTime,
  ZonedDateTime,
  ZoneId,
  ZoneOffset,
} from '@js-joda/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly url: string = 'iqb-personnel-api/login';

  constructor(private http: HttpClient) {}

  private static handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  private static setSession(
    accessToken: string,
    expirationSeconds: number
  ): void {
    const expiresAt: LocalDateTime =
      LocalDateTime.now().plusSeconds(expirationSeconds);
    const epochSeconds: number = expiresAt.toEpochSecond(ZoneOffset.UTC);
    const milliOfSecond: number = expiresAt.get(ChronoField.MILLI_OF_SECOND);
    const expiresAtTimestamp: number = epochSeconds * 1000 + milliOfSecond;

    localStorage.setItem('jwt_token', accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAtTimestamp));
  }

  login(
    username: string,
    password: string
  ): Observable<{ accessToken: string; expirationSeconds: number }> {
    return this.http
      .post<{
        accessToken: string;
        expirationSeconds: number;
      }>(this.url, { username, password })
      .pipe(
        tap<{
          accessToken: string;
          expirationSeconds: number;
        }>((value: { accessToken: string; expirationSeconds: number }) =>
          AuthenticationService.setSession(
            value.accessToken,
            value.expirationSeconds
          )
        ),
        shareReplay(),
        catchError(AuthenticationService.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    let loggedIn = false;

    if (this.getExpiration()?.isAfter(LocalDateTime.now())) {
      loggedIn = true;
    }

    return loggedIn;
  }

  getExpiration(): LocalDateTime | null {
    const expiresAtTimestampItem: string | null =
      localStorage.getItem('expires_at');
    const expiresAtTimestamp: number | null = expiresAtTimestampItem
      ? JSON.parse(expiresAtTimestampItem)
      : null;

    return expiresAtTimestamp
      ? ZonedDateTime.ofInstant(
          Instant.ofEpochMilli(expiresAtTimestamp),
          ZoneId.UTC
        ).toLocalDateTime()
      : null;
  }
}
