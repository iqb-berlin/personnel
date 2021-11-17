import { Injectable } from '@nestjs/common';
import { Message } from '@personnel/iqb-personnel-dtos';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to iqb-personnel-api!' };
  }
}
