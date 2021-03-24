import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

// configure swagger
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Edu Server')
  .setDescription('Edu Server API documentation')
  .setVersion('0.0.1')
  .setContact(
    'Code for Cause',
    'https://codeforcause.org/',
    'team@codeforcause.org',
  )
  .setLicense(
    'MIT',
    'https://github.com/codeforcauseorg/edu-server/blob/master/LICENSE',
  )
  .addServer('http://localhost:5000/', 'Development Server')
  .addBearerAuth()
  .build();

// adding custom options
export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Edu Server API Docs',
  customfavIcon: 'https://codeforcause.org/favicon.ico',
};
