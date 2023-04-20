import {Router, Response} from 'express';
import { obterMusicas } from '../services/musicasService';
import { verificarJWT } from '../middlewares/jwt';
const musicaController = Router();

musicaController.get(`/musicas`, verificarJWT, async (req, res) : Promise<Response> => {
    const result = await obterMusicas();
    return res.status(result.status).send({data: result.data});
})

export default musicaController;