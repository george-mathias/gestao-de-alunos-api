import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app.js';
import 'dotenv/config'

async function createStudent(student, token) {
    const response = await request(app)
        .post('/api/admin/alunos')
        .set('Authorization', `Bearer ${token}`)
        .send(student.data)

    expect(response.status).to.equal(201)
    expect(response.body).to.have.property('id')
    expect(response.body.role).to.equal('aluno')

    return response.body.id

}

export { createStudent }