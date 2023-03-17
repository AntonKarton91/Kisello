import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000
  app.enableCors();
  await app.listen(5000, () => console.log("Сервер запущен на порту ", PORT));
}
bootstrap();
