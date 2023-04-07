import {Router, Response} from 'express';
import {verificarJWT} from '../middlewares/jwt'
import { criarPlaylist, deletarPlaylist, editarPlaylist, obterPlaylist } from '../services/playlistService';
const playlistController = Router();


playlistController.post(`/playlist`, verificarJWT, async (req, res) : Promise<Response> => {
    const result = await criarPlaylist(req);
    return res.status(result.status).send({data: result.data});
})

playlistController.delete(`/playlist/:id`, verificarJWT, async (req, res) : Promise<Response> => {
    const result = await deletarPlaylist(req);
    return res.status(result.status).send({data: result.data});
})

playlistController.get(`/playlist/`, verificarJWT, async (req, res) : Promise<Response> => {
    const result = await obterPlaylist();
    return res.status(result.status).send({data: result.data});
})

playlistController.put(`/playlist`, verificarJWT, async (req, res) : Promise<Response> => {
    const result = await editarPlaylist(req);
    return res.status(result.status).send({data: result.data});
})

export default playlistController;