import { Request } from "express";
import { Usuario } from "../models/user.model";
import { IResponseModel, IUser } from "../interfaces/user";
import { gerarHash } from '../utils/bcrypt'


export async function cadastrarUsuario(req: Request) : Promise<IResponseModel>{
    const body : IUser = req.body;
    if(body.nome === `` || !body.nome) return {status: 400, data: `A requisição deve conter o campo nome.`}
    if(body.senha === ``|| !body.senha) return {status: 400, data: `A requisição deve conter o campo senha.`}
    if(body.email === ``|| !body.email) return {status: 400, data: `A requisição deve conter o campo email.`}
    
    body.senha = await gerarHash(body.senha);

    const existeEmail = await verificarEmail(body.email);
    
    if(existeEmail.data.length > 0) return {status: 400, data: `Email já cadastrado.`}
    try {
        const result = await Usuario.create({
            nome: body.nome,
            email: body.email,
            senha: body.senha,
            role: `USER`
        })
        return {status: 200, data: `Usuário cadastrado com o ID: ${result.dataValues?.id}`}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}

export async function obterUsuarios() : Promise<IResponseModel> {
    try{
        const result = await Usuario.findAll({raw: true})
        return {status: 200, data: result}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}

export async function obterUm(req : Request) : Promise<Usuario | null> {
    const {params} = req;
    try{
        const result = await Usuario.findByPk(params.id)
        return result;
    }catch(error){
        return error as null;
    }
}

export async function deletarUsuario(req : Request)  : Promise<IResponseModel> {
    const {params} = req;
    const existe = await obterUm(req);
    if(!existe){ return {status: 400, data: `Playlist não encontrado.`};}
    
    try{
        const result = await Usuario.destroy({
            where: {
                id: params.id
            }
        })
        return {status: 200, data: `${result} linha(s) deletada(s) com sucesso.`}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}

export async function editarUsuario(req : Request) : Promise<IResponseModel> {
    const body : IUser = req.body;
    if(!body.id) return {status: 400, data: `A requisição deve conter o campo id.`}
    if(body.nome === `` || !body.nome) return {status: 400, data: `A requisição deve conter o campo nome.`}
    if(body.email === ``|| !body.email) return {status: 400, data: `A requisição deve conter o campo email.`}
    if((body.role != `ADMIN` && body.role != `USER`)) return {status: 400, data: `A role deve ser 'ADMIN' OU 'USER'.`}

    try{
        const result = await Usuario.update({
            nome: body.nome,
            email: body.email,
            role: body.role
        },{
            where: {
                id: body.id
            }
        })
        return {status: 200, data: `${result} linha(s) atualizada(s) com sucesso.`}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}

async function verificarEmail(email: string) : Promise<IResponseModel> {
    try {
        const result = await Usuario.findAll({
            attributes: [`id`, `email`, `senha`, `role`],
            where:{
                email : email
            },
            raw: true
        })
        return { status:200, data:result};
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}