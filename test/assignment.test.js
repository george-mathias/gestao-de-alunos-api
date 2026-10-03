import request from 'supertest'
import { expect } from 'chai'
import app from '../src/app.js'
import 'dotenv/config'
import getToken from './support/helpers/auth.helper.js'
import { validStudentFactory } from './support/factories/student.factory.js'
import { createStudent } from './support/helpers/student.helper.js'
import { createClassFactory } from './support/factories/class.factory.js'
import { createClassHelper, signupClassHelper } from './support/helpers/class.helper.js'
import { timestamp } from './support/helpers/helpers.js'


describe('POST /alunos/{alunoId}/trabalhos', async () => {

    let token, validStudent, studentId, newClassFactory, newClassId, signupClassId, sufixo

    const data = {
        email: process.env.VALID_ADMIN_EMAIL,
        senha: process.env.VALID_ADMIN_SENHA
    }

    before(async () => {
        token = await getToken(data)
        validStudent = await validStudentFactory()
        studentId = await createStudent(validStudent, token)
        newClassFactory = await createClassFactory()
        newClassId = await createClassHelper(newClassFactory, token)
        signupClassId = await signupClassHelper(newClassId, studentId, token)
        sufixo = await timestamp()
    })

    it('register a new assingment', async () => {
        const data = {
            disciplinaId: newClassId,
            titulo: `lista de exercicios ${sufixo}`,
            descricao: 'vale 10 pontos na média'
        }

        const response = await request(app)
            .post(`/api/alunos/${studentId}/trabalhos`)
            .set('Authorization', `Bearer ${token}`)
            .send(data)

        expect(response.status).to.equal(201)
        expect(response.body.alunoId).to.equal(studentId)
        expect(response.body.disciplinaId).to.equal(newClassId)
        expect(response.body.titulo).to.equal(data.titulo)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('alunoId')

    })
})