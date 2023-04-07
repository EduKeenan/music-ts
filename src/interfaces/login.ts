import { Usuario } from '../models/user.model'
import { Login } from '../models/login.model'

export interface ILogin {
    email: string,
    senha: string
}

export interface IResponseModelLogin {
    status: number,
    data : Array<Usuario> | Array<Login> |string,
    token?: string 
}

export interface TokenPayload {
    id_usuario: string,
    adm: boolean,
    iat: number,
    exp: number
  }



