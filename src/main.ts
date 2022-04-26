import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { environment } from './environment/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix(environment.server.prefix);

  setupSwagger(app);

  await app.listen(environment.server.port);
}
bootstrap();
