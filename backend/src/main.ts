import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import "reflect-metadata";
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import { EnvironmentVariables } from "./common/interfaces/environment-variables.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    })
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });

  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  const allowedOrigins = configService.get<string[]>("APP_CORS_ORIGINS");
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("Library ITE API")
    .setDescription("API for the Library ITE system")
    .setVersion(process.env.APP_VERSION || "0.0.0")
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
