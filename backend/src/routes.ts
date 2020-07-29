import express from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { addUser, deleteUser, getUser, getUsers, updateUser } from './controllers/user';

const routes = express.Router();

routes.get('/users', celebrate({
	[Segments.QUERY]: Joi.object().keys({
		page: Joi.number().min(1)
	})
}), getUsers);

routes.get('/user/:id', celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required().integer()
	})
}), getUser);

routes.post('/user', celebrate({
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		number: Joi.number().required().integer().positive()
	})
}), addUser);

routes.put('/user/:id', celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required().integer()
	}),
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string(),
		email: Joi.string().email(),
		number: Joi.number().integer().positive()
	})
}), updateUser);

routes.delete('/user/:id', celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required().integer()
	})
}), deleteUser);

export default routes;