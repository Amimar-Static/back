import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Amimar LTDA')
  .setDescription('E-commerce')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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