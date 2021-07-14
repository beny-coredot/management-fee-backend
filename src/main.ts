import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    
    const config = new DocumentBuilder()
        .setTitle('api swagger')
        .setDescription('description...')
        .setVersion('v1')
        .addBearerAuth()
        .addTag('user')
        .addTag('administer')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = ( process.env.PORT || 3000 ) as number;
	await app.listen(port, '0.0.0.0', () => {
		console.log(`Complete run server - listen port: ${port}, NODE_ENV: ${process.env.NODE_ENV}`);
	});
}
bootstrap();
