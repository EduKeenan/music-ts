import {Playlist} from '../models/playlist.model'
export interface IPlaylist {
    id: number
    nome: string
    genero: string
    musicas: number[]
    id_usuario: number
}

export interface IResponseModel {
    status: number,
    data : Array<Playlist> | string
}

export interface IServiceObj{
    id: number,
    nome: string,
    id_usuario: number,
    genero: string,
    musicas: string
}