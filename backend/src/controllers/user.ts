import express, { Response } from 'express';
import Users, { IUser } from '../models/user';

let users: Users = new Users();

export const getUsers = (request: express.Request, response: express.Response): Response<any> => {
	const { page = 1 } = request.query;

	return response.header('X-Total-Count', users.getUsers().length.toString()).json(users.getUsers().slice(((page as number) - 1) * 5, ((page as number) - 1) * 5 + 5));
};

export const getUser = (request: express.Request, response: express.Response): Response<any> => {
	const user: IUser | undefined = users.getUser(parseInt(request.params.id));

	if (user) {
		return response.status(200).json(user); // http status code OK
	}
	else {
		return response.status(404).json({
			message: 'User not found'
		});
	}
};

export const addUser = (request: express.Request, response: express.Response): Response<any> => {
	const { name, email, number } = request.body;

	const id = users.addUser(name, email, number);

	return response.status(201).send({ id }); // http status code created
};

export const updateUser = (request: express.Request, response: express.Response): Response<any> => {
	const id: number = parseInt(request.params.id);
	const user: IUser | undefined = users.getUser(id);

	if (user) {
		const { name, email, number } = request.body;

		users.updateUser(id, name, email, number);

		return response.status(200).send(); // http status code OK
	}
	else {
		return response.status(404).json({
			message: 'User not found'
		});
	}
};

export const deleteUser = (request: express.Request, response: express.Response): Response<any> => {
	const id: number = parseInt(request.params.id);
	const user: IUser | undefined = users.getUser(id);

	if (user) {
		users.deleteUser(id);

		return response.status(200).send(); // http status code OK
	}
	else {
		return response.status(404).json({
			message: 'User not found'
		});
	}
};