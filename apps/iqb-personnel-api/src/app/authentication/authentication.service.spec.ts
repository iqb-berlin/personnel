import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { AuthenticationService } from './authentication.service';

jest.mock('../user/user.service');
const userService = UserService as jest.MockedClass<typeof UserService>;

jest.mock('@nestjs/jwt');
const jwtService = JwtService as jest.MockedClass<typeof JwtService>;

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService, userService, jwtService],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
