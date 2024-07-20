import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { RequestMiddleware } from './helpers/middlewares/request.middleware';
import {Logger, ValidationPipe} from '@nestjs/common';
import bodyParser from 'body-parser';

async function bootstrap() {
  // console.log('bootstraping process.env.PORT', process.env.PORT);

  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.use(new RequestMiddleware().use);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );
  app.enableCors({ origin: '*' });

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  // const config = new DocumentBuilder()
  //   .setTitle('prime nestjs')
  //   .setDescription('Boilerplate for nestjs')
  //   .setVersion('1.0')
  //   .addTag('api')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    const logger = new Logger();
    logger.log(`Listening on http://localhost:${ process.env.PORT}`);
  });
  console.log('end bootstraping process.env.PORT', process.env.PORT);


}
bootstrap();
