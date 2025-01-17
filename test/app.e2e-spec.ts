import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AuthDTO, UserDTO, InsertBookDTO, UpdateBookDTO } from '../src/dto';
import * as pactum from 'pactum';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init;
    await app.listen(3000);
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    const dtoUser1: AuthDTO = {
      email: 'noval@gmail.com',
      password: 'Noval1234',
    };

    const dtoUser2: AuthDTO = {
      email: 'test@gmail.com',
      password: 'Test1234',
    };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dtoUser1.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dtoUser1.password,
          })
          .expectStatus(400);
      });

      it('should signup a new user 1', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dtoUser1)
          .expectStatus(201);
      });

      it('should signup a new user 2', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dtoUser2)
          .expectStatus(201);
      });
    });

    describe('Login', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: dtoUser1.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: dtoUser1.password,
          })
          .expectStatus(400);
      });

      it('should login a user 1', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dtoUser1)
          .expectStatus(201)
          .stores('userAt1', 'access_token');
      });

      it('should login a user 2', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dtoUser2)
          .expectStatus(201)
          .stores('userAt2', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get Current User', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/user/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .expectStatus(200);
      });
    });

    describe('Edit User', () => {
      it('should edit user 1', () => {
        const userDto1: UserDTO = {
          name: 'Noval',
          email: 'noval@example.com',
        };
        return pactum
          .spec()
          .patch('/user/edit')
          .withBody(userDto1)
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .expectStatus(200);
      });

      it('should edit user 2', () => {
        const userDto2: UserDTO = {
          name: 'Test',
          email: 'test@example.com',
        };
        return pactum
          .spec()
          .patch('/user/edit')
          .withBody(userDto2)
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .expectStatus(200);
      });
    });
  });

  describe('Book', () => {
    const dtoInsertBook1: InsertBookDTO = {
      title: 'Sherlock Holmes & Moriarty',
      total_page: 300,
      author: 'Arthur Conan Doyle',
    };
    const dtoUpdateBook: UpdateBookDTO = {
      current_page: 300,
      doneReading: true,
    };

    const dtoInsertBook2: InsertBookDTO = {
      title: 'Sherlock Holmes & Moriarty',
      total_page: 300,
      author: 'Arthur Conan Doyle',
    };

    describe('Get All Books', () => {
      it('should get no book', () => {
        return pactum
          .spec()
          .get('/book')
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .expectStatus(403)
          .expectBodyContains("You don't have any book");
      });
    });

    describe('Create Book', () => {
      it('should create book for user 1', () => {
        return pactum
          .spec()
          .post('/book/create')
          .withBody(dtoInsertBook1)
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .expectStatus(201)
          .stores('bookIdUser1', 'id_book');
      });

      it('should create book for user 2', () => {
        return pactum
          .spec()
          .post('/book/create')
          .withBody(dtoInsertBook2)
          .withHeaders({ Authorization: 'Bearer $S{userAt2}' })
          .expectStatus(201)
          .stores('bookIdUser2', 'id_book');
      });

      it('should get all user 1 books', () => {
        return pactum
          .spec()
          .get('/book')
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .expectStatus(200);
      });
    });

    describe('Get Book by Id', () => {
      it('should get user 1 book by id', () => {
        return pactum
          .spec()
          .get('/book/{id}')
          .withPathParams({ id: '$S{bookIdUser1}' })
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .expectStatus(200)
          .expectBodyContains('$S{bookIdUser1}');
      });

      it('user 1 should not get user 2 book by id', () => {
        return pactum
          .spec()
          .get('/book/{id}')
          .withPathParams({ id: '$S{bookIdUser2}' })
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .expectStatus(403)
          .expectBodyContains("You don't have access to this book")
          .inspect();
      });
    });

    describe('Edit Book', () => {
      it('should edit user 1 book', () => {
        return pactum
          .spec()
          .patch('/book/edit/{id}')
          .withPathParams({ id: '$S{bookIdUser1}' })
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .withBody(dtoUpdateBook)
          .expectBodyContains('Update Successsfull')
          .expectStatus(200);
      });

      it('user 1 should not edit user 2 book', () => {
        return pactum
          .spec()
          .patch('/book/edit/{id}')
          .withPathParams({ id: '$S{bookIdUser2}' })
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .withBody(dtoUpdateBook)
          .expectBodyContains("You don't have access to this book")
          .expectStatus(403);
      });
    });

    describe('Delete Book', () => {
      it('should delete user 1 book', () => {
        return pactum
          .spec()
          .delete('/book/delete/{id}')
          .withPathParams({ id: '$S{bookIdUser1}' })
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .expectStatus(200);
      });

      it('user 1 should not delete user 2 book', () => {
        return pactum
          .spec()
          .delete('/book/delete/{id}')
          .withPathParams({ id: '$S{bookIdUser2}' })
          .withHeaders({ Authorization: 'Bearer $S{userAt1}' })
          .expectStatus(403)
          .expectBodyContains("You don't have access to this book");
      });
    });
  });
});
