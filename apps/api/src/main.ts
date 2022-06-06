import {  Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { FastifyAdapter } from "@nestjs/platform-fastify";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  const globalPrefix = 'graphql';
  const port = process.env.PORT || 3333;
  const isProduction = process.env.NODE_ENV === 'production';

  const developmentContentSecurityPolicy = {
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://unpkg.com/']
    }
  }

  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : developmentContentSecurityPolicy
    })
  )

  app.enableCors({
    origin: true
  })

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      //whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  )
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/graphiql`);
}

bootstrap();
