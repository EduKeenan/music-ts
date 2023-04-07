import {Router, Response} from 'express';
import {login, logout} from '../services/loginService'
import {verificarJWT} from '../middlewares/jwt'
const loginController = Router();


loginController.post(`/login`, async (req, res) : Promise<Response> => {
    const result = await login(req);
    return res.status(result.status).send({data: result.data, token: result?.token});
})

loginController.post(`/logout`, verificarJWT , async (req, res) : Promise<Response> => {
    const result = await logout(req);
    return res.status(result.status).send({data: result.data});
})

export default loginController;