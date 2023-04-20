import { Request } from "express";
import { ILogin, IResponseModelLogin } from "../interfaces/login";
import { Usuario } from "../models/user.model";
import { Login } from "../models/login.model";
import { IResponseModel } from "../interfaces/user";
import { compararHash } from "../utils/bcrypt";
import { sign } from 'jsonwebtoken'

export async function login(req : Request) : Promise<IResponseModelLogin>{
    const body : ILogin = req.body;
    let admin = true;
    if(body.email == `` || body.senha == ``) return {status: 400, data: `A requisição não preenche os requisitos.`}
    
    const existe = await verificarEmail(body.email);
    if(existe.data.length === 0 || typeof existe.data === `string`) return {status: 400, data: `Email não cadastrado.`}
    
    if(existe.data[0].role === `USER`) admin = false;
    
    const bateSenha = await compararHash(body.senha, existe.data[0].senha);
    if(!bateSenha) return {status: 401, data: `Não autorizado.`}
    const token = sign({id_usuario: existe.data[0].id, adm: admin}, process.env.JWT_KEY as string, {expiresIn: 600})
    return {status: 200, data: `Login realizado com sucesso.`, token: token, nome: existe.data[0].nome }
}

export async function logout(req: Request) : Promise<IResponseModel> {
    const token = req.headers[`x-access-token`]
    try{
        await Login.create({
            token: token 
        })
        return {status: 200, data: `Logout realizado com sucesso.`}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}

export async function consultarLogout(req: Request) : Promise<IResponseModelLogin> {
    const token = req.headers[`x-access-token`]
    try{
        const result = await Login.findAll({
            where:{
                token: token 
            },
            raw: true   
        })
        return {status: 200, data: result}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}

async function verificarEmail(email: string) : Promise<IResponseModel> {
    try {
        const result = await Usuario.findAll({
            attributes: [`id`, `nome`, `email`, `senha`, `role`],
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