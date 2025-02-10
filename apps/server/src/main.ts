import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Active CORS pour permettre l'accès depuis d'autres domaines

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT, '0.0.0.0'); // Écoute sur toutes les interfaces
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}

bootstrap();
