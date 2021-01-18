import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import AppModule from './module';

NestFactory.create(AppModule)
	.then((app: INestApplication) => app.listen(8080));