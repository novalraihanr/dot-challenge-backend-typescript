import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../decorator';
import { InsertBookDTO, UpdateBookDTO } from '../../dto/book.data';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('book')
export class bookController {
  constructor(private bookService: BookService) {}
  @Get()
  findAllBook(@CurrentUser('id') userId: number) {
    return this.bookService.findAll(userId);
  }

  @Get(':id')
  getBookById(
    @Param('id', ParseIntPipe) bookId: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.bookService.findOne(bookId, userId);
  }

  @Post('/create')
  createBook(@Body() data: InsertBookDTO, @CurrentUser('id') userId: number) {
    return this.bookService.createBook(data, userId);
  }

  @Patch('/edit/:id')
  updateBook(
    @Param('id', ParseIntPipe) bookId: number,
    @Body() data: UpdateBookDTO,
    @CurrentUser('id') userId: number,
  ) {
    return this.bookService.editBook(bookId, userId, data);
  }

  @Delete('/delete/:id')
  deleteBook(
    @Param('id', ParseIntPipe) bookId: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.bookService.deleteBook(bookId, userId);
  }
}
