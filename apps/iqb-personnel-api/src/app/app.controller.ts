import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Message } from '@personnel/iqb-personnel-dtos';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication/authentication.service';
import { LocalAuthGuard } from './authentication/guard/local-auth.guard';
import { JwtAuthGuard } from './authentication/guard/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthenticationService
  ) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req
  ): Promise<{ accessToken: string; expirationSeconds: number }> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
