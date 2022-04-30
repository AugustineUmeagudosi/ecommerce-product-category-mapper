import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../users/dto/user.dto';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller.login).toBeDefined();
    expect(controller.signUp).toBeDefined();
  });

  describe('signup', () => {
    it('should register a user', () => {
      expect(
        controller.signUp({
          email: 'test@example.com',
          password: 'loremIpsum',
          role: Role.ADMIN,
        }),
      ).toBe('worked');
    });
  });
});
