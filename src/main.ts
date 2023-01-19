import { config } from 'dotenv';

config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { databaseInstance } from './database/connection';

async function bootstrap() {
  databaseInstance.databaseConnection(async () => {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
    await app.listen(3003);
  });
}
bootstrap();
