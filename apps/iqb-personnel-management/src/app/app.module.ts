import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { AuthenticationInterceptor } from './authentication/authentication.interceptor';
import { AuthenticationGuardService } from './authentication/authentication-guard.service';
import { PersonnelService } from './services/personnel.service';

@NgModule({
  declarations: [AppComponent, LoginComponent, PersonnelComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    AuthenticationGuardService,
    PersonnelService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
