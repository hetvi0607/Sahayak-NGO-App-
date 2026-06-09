import swaggerJsdoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SahayaK REST API',
      version: '1.0.0',
      description: 'API for seekers, volunteers, admins, surveys, NGOs, notifications, uploads, and future AI modules.'
    },
    servers: [{ url: 'http://localhost:5000', description: 'Local server' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      }
    }
  },
  apis: ['./routes/*.js']
});

export default swaggerSpec;
