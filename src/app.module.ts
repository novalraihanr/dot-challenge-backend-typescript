import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './models/users/user.module';
import { BookModule } from './models/books/book.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users/user.entity';
import { Book } from './models/books/book.entity';
import { Sequelize } from 'sequelize-typescript';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [User, Book],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    await this.sequelize.sync({ force: true }); // This will drop and recreate tables

    console.log('Database synchronized with force: true');
  }
}
