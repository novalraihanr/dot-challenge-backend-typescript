import { Module } from '@nestjs/common';
import { bookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  controllers: [bookController],
  providers: [BookService],
})
export class BookModule {}
