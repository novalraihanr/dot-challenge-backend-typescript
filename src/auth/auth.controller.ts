import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from '../dto';

@Controller('auth')
export class AuthController {
  //Dependencies Injection
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() data: AuthDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: AuthDTO) {
    return this.authService.login(data);
  }
}
