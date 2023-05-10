import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Hestia api')
    .setDescription('The Hestia API description')
    .setVersion('1.0')
    .addTag('hotel')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  app.enableCors();
  await app.listen(8081);
}
bootstrap();
