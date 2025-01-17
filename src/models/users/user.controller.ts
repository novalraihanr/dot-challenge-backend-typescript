import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserDTO } from '../../dto';
import { CurrentUser } from '../../decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class userController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  @Patch('edit')
  editUser(@CurrentUser('id') userId: number, @Body() data: UserDTO) {
    return this.userService.updateUser(userId, data);
  }
}
