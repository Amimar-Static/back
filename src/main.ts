import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({whitelist: true}),
    new ValidationPipe({
      transform: true,
      transformOptions: {groups: ["transform"]}
    })
  )
  await app.listen(3000);
}
bootstrap();


//{whitelist: true} = remoção de todos os campos que não são da entidade.