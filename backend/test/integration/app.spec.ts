import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../src/module';

describe('Integration: can create new users', (): void => {
	let app: INestApplication;

	beforeAll(async (): Promise<void> => {
		const module = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	it('the staus should be 201', (): void => {
		for (let i: number = 0; i <= 2; i++) {
			request(app.getHttpServer())
				.post('/user')
				.send({
					name: 'Foo Bar',
					email: 'foobar@email.com',
					number: 999999999
				})
				.expect(201)
				.expect({ id: i });
		}
	});

	afterAll(async (): Promise<void> => {
		await app.close();
	});
});

describe('Integration: can list the users', (): void => {
	let app: INestApplication;

	beforeAll(async (): Promise<void> => {
		const module = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	it('should return the created users', async (): Promise<void> => {
		for (let i: number = 0; i <= 2; i++) {
			request(app.getHttpServer())
				.post('/user')
				.send({
					name: 'Foo Bar',
					email: 'foobar@email.com',
					number: 999999999
				});
		}

		request(app.getHttpServer())
			.get('/users')
			.expect(200)
			.expect([
				{ id: 0, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 },
				{ id: 1, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 },
				{ id: 2, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 }
			]);
	});

	afterAll(async (): Promise<void> => {
		await app.close();
	});
});

describe('Integration: can get a user', (): void => {
	let app: INestApplication;

	beforeAll(async (): Promise<void> => {
		const module = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	it('should ', (): void => {
		request(app.getHttpServer())
			.post('/user')
			.send({ name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 });

		request(app.getHttpServer())
			.get('/user/0')
			.expect(200)
			.expect({
				id: 0,
				name: 'Foo Bar',
				email: 'foobar@email.com',
				number: 999999999
			});
	});

	afterAll(async (): Promise<void> => {
		await app.close();
	});
});

describe('Integration: can update a user', (): void => {
	let app: INestApplication;

	beforeAll(async (): Promise<void> => {
		const module = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	it('should ', (): void => {
		for (let i: number = 0; i <= 2; i++) {
			request(app.getHttpServer())
				.post('/user')
				.send({
					name: 'Foo Bar',
					email: 'foobar@email.com',
					number: 999999999
				});
		}

		request(app.getHttpServer())
			.put('/user/0')
			.send({
				name: 'Foo',
				email: 'foo@email.com',
				number: 888888888
			})
			.expect(204);

		request(app.getHttpServer())
			.get('/users')
			.expect(200)
			.expect([
				{ id: 0, name: 'Foo', email: 'foo@email.com', number: 888888888 },
				{ id: 1, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 },
				{ id: 2, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 }
			]);
	});

	afterAll(async (): Promise<void> => {
		await app.close();
	});
});

describe('Integration: can delete a user', (): void => {
	let app: INestApplication;

	beforeAll(async (): Promise<void> => {
		const module = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	it('should ', (): void => {
		request(app.getHttpServer())
			.delete('/user/0')
			.expect(200);

		request(app.getHttpServer())
			.get('/users')
			.expect(200)
			.expect([
				{ id: 1, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 },
				{ id: 2, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 }
			]);
	});

	afterAll(async (): Promise<void> => {
		await app.close();
	});
});