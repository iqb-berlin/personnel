import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByName(username);

    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }
}
