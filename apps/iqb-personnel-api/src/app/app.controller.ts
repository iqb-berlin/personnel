import { Controller, Get } from '@nestjs/common';

import { Message } from '@personnel/iqb-personnel-dtos';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }
}
