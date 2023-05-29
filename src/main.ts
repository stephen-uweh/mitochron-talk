import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Mitochron Hub Talk App')
    .setDescription('Mitochron Hub Talk App API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();


// {
//   "$schema": "https://json.schemastore.org/nest-cli",
//   "collection": "@nestjs/schematics",
//   "sourceRoot": "src"
// }
