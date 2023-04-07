import {Router, Response} from 'express';
import { cadastrarUsuario, obterUsuarios, deletarUsuario, editarUsuario } from '../services/userService';
import {verificarJWT} from '../middlewares/jwt'
import {verificaAutorizacao} from '../middlewares/authorization'
const userController = Router();

userController.get(`/user`, verificarJWT, verificaAutorizacao, async (req, res) : Promise<Response> =>{
    const result = await obterUsuarios();
    return res.send(result)
});

userController.post(`/user`, async (req, res) : Promise<Response> =>{
    const result = await cadastrarUsuario(req);
    return res.status(result.status).send(result.data);
});

userController.delete(`/user/:id`, verificarJWT, verificaAutorizacao, async (req, res) : Promise<Response> =>{
    const result = await deletarUsuario(req);
    return res.status(result.status).send(`Usuário deletado com sucesso.`);
});

userController.put(`/user`, verificarJWT, verificaAutorizacao, async (req, res) : Promise<Response> =>{
    const result = await editarUsuario(req);
    return res.status(result.status).send(result.data);
})

export default userController;