import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import 'dotenv/config';
import testesDeLogin from './support/fixtures/auth.fixture.json' with { type: 'json' }

describe('POST /api/auth/login', () => {

    it('login de admin com sucesso', () => {

        testesDeLogin.adminSucesso.forEach(testeDeLogin => {
            const data = {
                email: process.env.VALID_ADMIN_EMAIL,
                senha: process.env.VALID_ADMIN_SENHA
            }

            it(testeDeLogin.testTitle, async () => {
                const resposta = await request(app)
                    .post('/api/auth/login')
                    .send(data)

                expect(resposta.status).to.equal(testeDeLogin.expectedStatusCode)
                expect(resposta.body).to.have.property('token')
            })
        })
    })

    it('login de user com sucesso', () => {

        testesDeLogin.userSucesso.forEach(testeDeLogin => {
            const data = {
                email: process.env.VALID_USER_EMAIL,
                senha: process.env.VALID_USER_SENHA
            }

            it(testeDeLogin.testTitle, async () => {
                const resposta = await request(app)
                    .post('/api/auth/login')
                    .send(data)

                expect(resposta.status).to.equal(testeDeLogin.expectedStatusCode)
                expect(resposta.body).to.have.property('token')
            })
        })
    })

    it('login de admin com falha', () => {

        testesDeLogin.adminFalha.forEach(testeDeLogin => {
            const data = {
                email: process.env.INVALID_ADMIN_EMAIL,
                senha: process.env.INVALID_ADMIN_SENHA
            }

            it(testeDeLogin.testTitle, async () => {
                const resposta = await request(app)
                    .post('/api/auth/login')
                    .send(data)

                expect(resposta.status).to.equal(testeDeLogin.expectedStatusCode)
                expect(resposta.body.error).to.equal(testeDeLogin.mensagemErro)
            })
        })
    })

    it('login de user com falha', () => {

        testesDeLogin.adminFalha.forEach(testeDeLogin => {
            const data = {
                email: process.env.INVALID_USER_EMAIL,
                senha: process.env.INVALID_USER_SENHA
            }

            it(testeDeLogin.testTitle, async () => {
                const resposta = await request(app)
                    .post('/api/auth/login')
                    .send(data)

                expect(resposta.status).to.equal(testeDeLogin.expectedStatusCode)
                expect(resposta.body.error).to.equal(testeDeLogin.mensagemErro)
            })
        })
    })
})