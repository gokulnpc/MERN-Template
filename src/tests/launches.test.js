const request = require('supertest');
const app = require('../app');
const { mongoConnect, mongoDisconnect } = require('../services/mongo');
const { loadPlanetsData } = require('../models/planets.model');

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
        await loadPlanetsData();
    }
    );
    afterAll(async () => {
        await mongoDisconnect();
    }
    );
    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        }
        );
    }
    );
});