import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';
import * as express from 'express';
import {join} from 'path';


async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: false});
    
    app.enableCors({credentials: true, origin: true});
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
    
    const config = new DocumentBuilder()
    .setTitle('Cloud Store')
    .setDescription('The Cloud Store API description')
    .setVersion('1.0')
    .addTag('cloudStore')
    .addBearerAuth()
    .build();
    
    const document = SwaggerModule.createDocument(app, config);
    
    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: {
            persistAuthorization: true
        }
    });
    
    await app.listen(5000);
}

bootstrap();
