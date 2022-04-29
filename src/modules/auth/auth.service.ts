import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { ...result } = user['dataValues'];
    return result;
  }

  public async login({ id, email, role }) {
    const userData: any = {};
    userData.id = id;
    userData.email = email;
    userData.role = role;

    const token = await this.generateToken(userData);
    return { userData, token };
  }

  public async create(user) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.create({ ...user, password: pass });

    // tslint:disable-next-line: no-string-literal
    const { ...result } = newUser['dataValues'];

    const userData: any = {};
    userData.id = result.id;
    userData.email = result.email;
    userData.role = result.role;

    // generate token
    const token = await this.generateToken(userData);

    // return the user and the token
    return { user: userData, token };
  }

  private generateToken(user) {
    return this.jwtService.signAsync(user);
  }

  private hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  private comparePassword(enteredPassword, dbPassword) {
    return bcrypt.compare(enteredPassword, dbPassword);
  }
}
