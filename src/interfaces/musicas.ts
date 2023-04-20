import {Musicas} from '../models/musica.model'
export interface IResponseModelMusicas {
    status: number,
    data : Array<Musicas> | string
}