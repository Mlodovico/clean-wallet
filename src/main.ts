import { NestFactory } from "@nestjs/core";
import { AppModule } from "./presentation/app.module";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error("Error during application bootstrap", error);
  }
}

bootstrap();
