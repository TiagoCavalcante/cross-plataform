import { NestFactory } from '@nestjs/core';
import AppModule from './module';

NestFactory.create(AppModule)
	.then((app) => app.listen(8080));