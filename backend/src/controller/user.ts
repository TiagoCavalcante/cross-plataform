import { Controller, Get, Header, Query, Body, NotFoundException, Post, HttpCode, Put, Param, Delete } from '@nestjs/common';
import Users, { IUser } from '../model/user';

const users = new Users();

@Controller('/users')
export default class UserController {
	@Get()
	@Header('X-Total-Count', users.getLenght().toString())
	getUsers(@Query('page') page: number): Array<IUser> {
		return users.getUsers((page - 1) * 5, page * 5);
	}

	@Get(':id')
	getUser(@Param('id') id: number): IUser {
		const user: IUser | undefined = users.getUser(id);

		if (user) {
			return user;
		}
		else {
			throw new NotFoundException();
		}
	}

	@Post()
	@HttpCode(201)
	addUser(
		@Body('name') name: string,
		@Body('email') email: string,
		@Body('number') number: number
	): { id: number; } {
		const id = users.addUser(name, email, number);

		return { id };
	};

	@Put(':id')
	@HttpCode(204)
	updateUser(
		@Param('id') id: number,
		@Body('name') name: string | undefined,
		@Body('email') email: string | undefined,
		@Body('number') number: number | undefined
	): void {
		if (users.getUser(id)) {
			users.updateUser(id, name, email, number);
		}
		else {
			throw new NotFoundException;
		}
	}

	@Delete(':id')
	@HttpCode(204)
	deleteUser(@Param('id') id: number) {
		if (users.getUser(id)) {
			users.deleteUser(id);
		}
		else {
			throw new NotFoundException();
		}
	}
}