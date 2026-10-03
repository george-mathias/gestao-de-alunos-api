import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app.js';

export default async function getToken(data) {
    const partialToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJh'
    const response = await request(app)
        .post('/api/auth/login')
        .send(data)

    expect(response.status).to.equal(200)
    expect(response.body.token).to.not.be.empty
    expect(response.body.token).to.contains(partialToken)

    return response.body.token
}