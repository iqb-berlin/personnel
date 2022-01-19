import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '@personnel/iqb-personnel-dtos';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<{ id: string; name: string }> {
    const user = await this.usersService.findByName(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(
    user: UserDto
  ): Promise<{ accessToken: string; expirationSeconds: number }> {
    const payload = { username: user.name, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      expirationSeconds: jwtConstants.expirationSeconds
    };
  }
}
