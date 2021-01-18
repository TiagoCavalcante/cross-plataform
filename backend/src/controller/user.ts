import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import Users, { IUser } from '../model/user';

const users = new Users();

@Controller('/users')
export default class UserController {
	@Get()
	getUsers(
		@Req() request: Request,
		@Res() response: Response
	): Response<any, Record<string, any>> {
		const { page = 1 }: { page?: number; } = request.query;

		return response
			.status(200)
			.header('X-Total-Count', users.getLenght().toString())
			.json(users.getUsers((page - 1) * 5, page * 5));
	}

	@Get(':id')
	getUser(
		@Param('id') id: string,
		@Res() response: Response
	): Response<any, Record<string, any>> {
		const user: IUser | undefined = users.getUser(Number(id));

		if (user) {
			return response
				.status(200)
				.json(user);
		}
		else {
			return response
				.status(404)
				.json({ message: 'User not found' });
		}
	}

	@Post()
	addUser(
		@Req() request: Request,
		@Res() response: Response
	): Response<any, Record<string, any>> {
		const { name, email, number }: {
			name: string;
			email: string;
			number: number;
		} = request.body;

		if (!name) {
			return response.
				status(400)
				.json({ message: "property 'name' missing" });
		}
		if (!email) {
			return response.
				status(400)
				.json({ message: "property 'email' missing" });
		}
		if (!number) {
			return response.
				status(400)
				.json({ message: "property 'number' missing" });
		}

		const id = users.addUser(name, email, number);

		return response
			.status(201)
			.send({ id });
	};

	@Put(':id')
	updateUser(
		@Param('id') id: string,
		@Req() request: Request,
		@Res() response: Response
	): Response<any, Record<string, any>> {
		if (users.getUser(Number(id))) {
			const { name, email, number }: {
				name?: string;
				email?: string;
				number?: number;
			} = request.body;

			users.updateUser(Number(id), name, email, number);

			return response
				.status(204)
				.send();
		}

		return response
			.status(404)
			.json({ message: 'User not found' });

	}

	@Delete(':id')
	deleteUser(
		@Param('id') id: string,
		@Res() response: Response
	): Response<any, Record<string, any>> {
		if (users.getUser(Number(id))) {
			users.deleteUser(Number(id));

			return response
				.status(204)
				.send();
		}

		return response
			.status(404)
			.json({ message: 'User not found' });

	}
}