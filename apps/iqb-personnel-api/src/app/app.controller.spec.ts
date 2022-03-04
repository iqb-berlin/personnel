import { Test, TestingModule } from '@nestjs/testing';
import { Message } from '@personnel/iqb-personnel-dtos';

import { AuthenticationService } from './authentication/authentication.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';

jest.mock('./authentication/authentication.service');
jest.mock('./app.service');
const appService = AppService as jest.MockedClass<typeof AppService>;

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AuthenticationService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to iqb-personnel-api!"', () => {
      // Arrange
      const expectedMessage = { message: 'Welcome to iqb-personnel-api!' };
      const getDataMock = appService.prototype.getData.mockImplementation(
        (): Message => {
          return expectedMessage;
        }
      );

      // Act
      const appController = app.get<AppController>(AppController);
      const actualMessage = appController.getData();

      // Assert
      expect(getDataMock).toReturnWith(expectedMessage);
      expect(actualMessage).toBe(expectedMessage);
    });
  });
});
