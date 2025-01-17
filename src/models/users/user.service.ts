import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async updateUser(userId: number, data) {
    return this.userModel
      .update({ ...data }, { where: { id: userId } })
      .then(() => {
        return { message: 'Update Successsfull' };
      });
  }
}
