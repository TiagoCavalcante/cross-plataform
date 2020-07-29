import request from 'supertest';
import app from '../../src/app';
import { response } from 'express';

describe('Integration: can create new users', () => {
	it('the staus should be 201', async () => {
		for (let i: number = 0; i <= 2; i++) {
			const response = await request(app).post('/user')
				.send({ name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 });

			expect(response.status).toBe(201); // expect the http status code 201 (created)
			expect(response.body).toStrictEqual({ id: i });
		}
	});
});

describe('Integration: can list the users', () => {
	it('should return the created users', async () => {
		for (let i: number = 0; i <= 2; i++) {
			request(app).post('/user')
				.send({ name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 });
		}

		const response = await request(app).get('/users');

		expect(response.status).toBe(200); // expect the http status code 200 (OK)
		expect(response.body).toStrictEqual([
			{ id: 0, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 },
			{ id: 1, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 },
			{ id: 2, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 }
		]);
	});
});

describe('Integration: can get a user', () => {
	it('should ', async () => {
		request(app).post('/user')
			.send({ name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 });

		const reponse = await request(app).get('/user/0');

		expect(reponse.status).toBe(200); // expect the http status code 200 (OK)
		expect(reponse.body).toStrictEqual({ id: 0, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 });
	});
});

describe('Integration: can update a user', () => {
	it('should ', async () => {
		for (let i: number = 0; i <= 2; i++) {
			request(app).post('/user')
				.send({ name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 });
		}
		expect((await request(app).put('/user/0').send({ name: 'Foo', email: 'foo@email.com', number: 888888888 })).status).toBe(200); // expect the http status code 200 (OK)

		const response = await request(app).get('/users');

		expect(response.status).toBe(200); // expect the http status code 200 (OK)
		expect(response.body).toStrictEqual([
			{ id: 0, name: 'Foo', email: 'foo@email.com', number: 888888888 },
			{ id: 1, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 },
			{ id: 2, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 }
		]);
	});
});

describe('Integration: can delete a user', () => {
	it('should ', async () => {
		expect((await request(app).delete('/user/0')).status).toBe(200); // expect the http status code 200 (OK)

		const response = await request(app).get('/users');

		expect(response.status).toBe(200); // expect the http status code 200 (OK)
		expect(response.body).toStrictEqual([
			{ id: 1, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 },
			{ id: 2, name: 'Foo Bar', email: 'foobar@email.com', number: 999999999 }
		]);
	});
});