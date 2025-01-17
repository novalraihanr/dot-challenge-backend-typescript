import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/users/user.entity';
import { AuthDTO } from '../dto';

@Injectable({})
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async login(data: AuthDTO) {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) throw new ForbiddenException('Email is Incorrect');
    const validatePass = await bcrypt.compare(data.password, user.password);
    if (!validatePass) throw new ForbiddenException('Password is Incorrect');
    return this.signToken(user.id, user.email);
  }

  async register(data: AuthDTO) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt.hash(data.password, salt);
      const user = await User.create({ email: data.email, password: hash });
      delete user.password;
      delete user.id;
      return user;
    } catch (error) {
      if (error.name == 'SequelizeUniqueConstraintError') {
        return {
          message: 'Email has already registered',
        };
      }
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15min',
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: token,
    };
  }
}
