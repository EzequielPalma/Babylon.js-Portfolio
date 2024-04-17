import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import workRoutes from '../../routes/works.routes.js'; // Importa el enrutador
import { describe, test, expect } from 'vitest';

let mongoServer;
let app;

describe('Works Routes', () => {
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    app = express();
    app.use('/', workRoutes);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  // Test para la ruta POST /registerwork
  test('POST /registerwork should create a new work', async () => {
    const newWorkData = {
      "name": "Test Work",
      "url": "http://example.com",
      "image": "http://example.com/image.jpg",
      "description": "This is a test description",
    };

    const response = await request(app)
      .post('/registerwork')
      .send(newWorkData);

    // Verifica que la respuesta tenga el código de estado esperado y contenga una propiedad '_id'
    expect(response.status).toBe(200); // Código de estado 200 indica éxito
    expect(response.body).toHaveProperty('_id'); // Verifica que la respuesta contiene una propiedad '_id'
  });

  // Test para la ruta GET /getworks
  test('GET /getworks should retrieve all works', async () => {
    const response = await request(app).get('/getworks');
  
    // Verifica que la respuesta tenga el código de estado esperado y contenga un array de trabajos
    expect(response.status).toBe(200); // Código de estado 200 indica éxito
    expect(Array.isArray(response.body)).toBeTruthy(); // Verifica que la respuesta contiene un array de trabajos
  });
});
