import {Usuario} from '../models/user.model'
export interface IUser {
    id: number
    nome: string
    email: string
    senha: string
    role: `ADMIN` | `USER`
}

export interface IResponseModel {
    status: number,
    data : Array<Usuario> | string
}