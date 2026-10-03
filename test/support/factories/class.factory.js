import { timestamp } from "../helpers/helpers.js";

async function createClassFactory() {

    const sufixo = await timestamp()

    return {
        data: {
            nome: `Testes na Camada de Serviço ${sufixo}`,
            codigo: `TCS${sufixo}`,
            cargaHoraria: 60
        },
        expectedStatusCode: 201
    }
}

export { createClassFactory }