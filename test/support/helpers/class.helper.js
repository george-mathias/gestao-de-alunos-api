import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app.js';
import 'dotenv/config'

async function createClassHelper(newClass, token) {
    
    const response = await request(app)
    .post('/api/admin/disciplinas')
    .set('Authorization', `Bearer ${token}`)
    .send(newClass.data)
    
    expect(response.status).to.equal(201)
    expect(response.body).to.have.property('id')
    expect(response.body).to.have.property('nome')
    
    return response.body.id
}

async function signupClassHelper(classId, studentId, token) {
    const response = await request(app)
        .post(`/api/admin/disciplinas/${classId}/matriculas`)
        .set('Authorization', `Bearer ${token}`)
        .send({ alunoId: studentId })

    expect(response.status).to.equal(201)
    expect(response.body).to.have.property('alunoId')
    expect(response.body).to.have.property('disciplinaId')
    expect(response.body).to.have.property('id')

    return response.body
}

export { createClassHelper, signupClassHelper }