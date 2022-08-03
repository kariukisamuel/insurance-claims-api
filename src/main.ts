import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //properly set headers using helmet
  app.use(helmet());
  //prevent cross site forgery
  // app.use(csurf());

  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Commision Claims App Api')
    .setDescription('All Apis')
    .setVersion('1.0')
    .addTag('End Points')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //validation pipeline instantiation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
