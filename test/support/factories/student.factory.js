import { timestamp } from "../helpers/helpers.js";

async function validStudentFactory() {

    const sufixo = await timestamp()

    return {
        testTitle: "deve retornar 200 e criar um novo estudante",
        data: {
            nome: `Jim Query ${sufixo}`,
            email: `jim.query.${sufixo}@example.com`,
            matricula: `${sufixo}`,
            senha: `${sufixo}`
        },
        expectedStatusCode: 201
    }
}

async function invalidStudentFactory() {

    const sufixo = await timestamp()

    return {
        testTitle: "deve retornar 409 e não deve criar um novo estudante",
        data: {
            nome: `Steve Trabalho ${sufixo}`,
            email: `steve.trabalho.${sufixo}@example.com`,
            matricula: `${sufixo}`,
            senha: `${sufixo}`
        },
        expectedStatusCode: 409,
        errorMessage: 'Já existe um aluno cadastrado com essa matrícula ou e-mail.'
    }
}

export { validStudentFactory, invalidStudentFactory }