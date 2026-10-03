import request from 'supertest'
import { expect } from 'chai'
import app from '../src/app.js'
import 'dotenv/config'
import getTokenAdmin from './support/helpers/auth.helper.js'
import { validStudentFactory, invalidStudentFactory } from './support/factories/student.factory.js'

describe('POST /api/admin/alunos', async () => {

    let tokenAdmin
    let validStudent = await validStudentFactory()
    let invalidStudent = await invalidStudentFactory()

    before(async () => {
        const data = {
            email: process.env.VALID_ADMIN_EMAIL,
            senha: process.env.VALID_ADMIN_SENHA
        }
        tokenAdmin = await getTokenAdmin(data)
    })

    it(validStudent.testTitle, async () => {
        const response = await request(app)
            .post('/api/admin/alunos')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send(validStudent.data)

        expect(response.status).to.equal(validStudent.expectedStatusCode)
        expect(response.body).to.have.property('id')
        expect(response.body.role).to.equal('aluno')
    })

    it(invalidStudent.testTitle, async () => {
        await request(app)
            .post('/api/admin/alunos')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send(invalidStudent.data)

        const response = await request(app)
            .post('/api/admin/alunos')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send(invalidStudent.data)

        expect(response.status).to.equal(invalidStudent.expectedStatusCode)
        expect(response.body.error).to.equal(invalidStudent.errorMessage)
        expect(response.body).to.have.property('error')
    })

})