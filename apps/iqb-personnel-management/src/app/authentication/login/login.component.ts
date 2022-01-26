import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'personnel-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  wrongCredentials = false;
  infoMessage = 'Invalid username or password';
  navigationPath = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.navigationPath = params['return'];

      if (this.authService.isLoggedIn()) {
        this.go();
      }
    });
  }

  login(formValue: { username: string; password: string }): void {
    if (formValue.username && formValue.password) {
      this.authService.login(formValue.username, formValue.password).subscribe({
        next: (result: { accessToken: string; expirationSeconds: number }) => {
          this.wrongCredentials = false;
          this.go();
        },
        error: (err) => {
          console.error(err);

          this.wrongCredentials = true;
          this.router.navigateByUrl('/login');
        },
      });
    } else {
      this.router.navigateByUrl('/login');
      this.wrongCredentials = true;
    }
  }

  private go() {
    this.router.navigateByUrl(this.navigationPath);
  }
}
