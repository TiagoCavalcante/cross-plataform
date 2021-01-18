import { Module } from '@nestjs/common';
import UserController from './controller/user';

@Module({
	controllers: [
		UserController
	]
})

export default class AppModule { };