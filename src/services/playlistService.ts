import { Request } from "express";
import { IResponseModel } from "../interfaces/playlist";
import { Playlist, PlaylistMusica } from "../models/playlist.model";
import { IPlaylist } from "../interfaces/playlist";
import { Sequelize } from "sequelize-typescript";

export async function criarPlaylist(req: Request) : Promise<IResponseModel> {
    const body : IPlaylist = req.body;
    if(body.nome === `` || !body.nome) return {status: 400, data: `A requisição deve conter o campo nome.`}
    if(body.genero === `` || !body.genero) return {status: 400, data: `A requisição deve conter o campo genero.`}
    if(body.musicas.length == 0) return {status: 400, data: `A requisição deve conter as os ids das músicas em formato array.`} 
    try{
        const resultPlaylist = await Playlist.create({
            nome: body.nome,
            id_usuario: req.id_usuario,
            genero: body.genero
        })
        body.musicas.forEach(async (musica) => {
            await PlaylistMusica.create({
                id_playlist: resultPlaylist.dataValues?.id,
                id_musica: musica
            })
        })
        return {status: 200, data: `Playlist cadastrada com o ID: ${resultPlaylist.dataValues?.id}`}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}

export async function editarPlaylist(req: Request) : Promise<IResponseModel> {
    const body : IPlaylist = req.body;
    if(body.nome === `` || !body.nome) return {status: 400, data: `A requisição deve conter o campo nome.`}
    if(body.genero === `` || !body.genero) return {status: 400, data: `A requisição deve conter o campo genero.`}
    if(body.musicas.length == 0) return {status: 400, data: `A requisição deve conter as os ids das músicas em formato array.`} 
    
    const existe = await obterUm(body.id);
    if(!existe){ return {status: 400, data: `Playlist não encontrado.`};} 
    if(existe.id_usuario != req.id_usuario && !req.adm) return {status: 403, data: `Você não possui autorização para alterar essa playlist.`}

    try{
        await Playlist.update({
            nome: body.nome,
            genero: body.genero,
        },{
            where: {
                id: body.id
            }
        })

        await PlaylistMusica.destroy({
            where:{
                id_playlist: body.id
            }
        })

        body.musicas.forEach(async (musica : number) => {
            await PlaylistMusica.create({
                id_playlist: body.id,
                id_musica: musica
            })
        })
        return {status: 200, data: `Playlist com o ID ${body.id}`}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}

export async function deletarPlaylist(req: Request) : Promise<IResponseModel> {
    const {params} = req;
    if(!params.id) return {status: 400, data: `A requisição deve conter o id à ser excluido.`}
    const existe = await obterUm(params.id);

    if(!existe){ return {status: 400, data: `Playlist não encontrado.`};}

    if(existe.id_usuario != req.id_usuario && !req.adm) return {status: 403, data: `A playlist ${existe.id_usuario} não pertence ao seu usuário.`}

    try {
        await Playlist.destroy({
            where: {
                id: params.id
            }
        })

        await PlaylistMusica.destroy({
            where: {
                id_playlist: params.id
            }
        })
        return {status: 200, data: `Playlist deletada com sucesso.`}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}


export async function obterUm(id : string | number) : Promise<Playlist | null> {
    try{
        const result = await Playlist.findByPk(id)
        return result;
    }catch(error){
        return error as null;
    }
}

export async function obterPlaylist() : Promise<IResponseModel> {
    try{
        const result = await Playlist.findAll({raw: true, 
            attributes: {
                include: [
                    [Sequelize.literal(`(SELECT GROUP_CONCAT(m.musica) FROM musicas m 
                    LEFT JOIN playlists_musicas pm ON pm.id_musica = m.id
                    WHERE pm.id_playlist = Playlist.id)`), `musicas`]
                ]
            }
        })
        return {status: 200, data: result}
    }catch(error){
        return {status: 500, data: `Ocorreu um erro interno ao servidor: ${error}.`}
    }
}


