import { ForbiddenException, Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectModel } from '@nestjs/sequelize';
import { InsertBookDTO, UpdateBookDTO } from '../../dto/book.data';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}
  async findAll(userId: number): Promise<Book[]> {
    const books = await this.bookModel.findAll({ where: { user_id: userId } });
    if (books.length == 0)
      throw new ForbiddenException("You don't have any book");
    return books;
  }

  async findOne(id_book: number, userId: number): Promise<Book> {
    const book = await this.bookModel.findOne({ where: { id_book: id_book } });
    if (!book) throw new ForbiddenException("Book doesn't exist");
    if (book['user_id'] != userId)
      throw new ForbiddenException("You don't have access to this book");
    if (!book) throw new ForbiddenException("Book doesn't exist");
    return book;
  }

  createBook(book: InsertBookDTO, userId: number) {
    return this.bookModel
      .create({
        title: book.title,
        total_page: book.total_page,
        author: book.author,
        current_page: book.current_page,
        doneReading: book.doneReading,
        user_id: userId,
      })
      .then((data) => {
        return data;
      });
  }

  async editBook(id_book: number, userId: number, data: UpdateBookDTO) {
    const book = await this.bookModel.findOne({ where: { id_book: id_book } });
    if (!book) throw new ForbiddenException("Book doesn't exist");
    if (book['user_id'] != userId)
      throw new ForbiddenException("You don't have access to this book");
    return this.bookModel
      .update({ ...data }, { where: { id_book: id_book } })
      .then(() => {
        return { message: 'Update Successsfull' };
      });
  }

  async deleteBook(id_book: number, userId: number) {
    const book = await this.bookModel.findOne({ where: { id_book: id_book } });
    if (book['user_id'] != userId)
      throw new ForbiddenException("You don't have access to this book");
    if (!book) throw new ForbiddenException("Book doesn't exist");
    return this.bookModel.destroy({ where: { id_book: id_book } }).then(() => {
      return { message: 'Delete Successsfull' };
    });
  }
}
