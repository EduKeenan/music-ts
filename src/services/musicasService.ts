
import { Musicas } from "../models/musica.model";
import { IResponseModelMusicas } from "../interfaces/musicas";


export async function obterMusicas() : Promise<IResponseModelMusicas> {
    try{
        const result = await Musicas.findAll({raw: true, 
        })
        return {status: 200, data: result}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}

