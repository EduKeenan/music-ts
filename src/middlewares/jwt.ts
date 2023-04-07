import {verify} from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'
import {consultarLogout} from '../services/loginService'
import { TokenPayload } from '../interfaces/login';
export async function verificarJWT(req : Request, res: Response, next: NextFunction){
    const token  = req.headers[`x-access-token`];
    if(!token) return res.status(401).end();
    verify(token as string, process.env.JWT_KEY as string, async (erro, decoded) => {
        if(erro) return res.status(401).end();

        const expired_token = await consultarLogout(req);
        if(expired_token.data.length > 0) return res.status(401).end();
        
        const {id_usuario, adm} = decoded as TokenPayload;

        req.id_usuario = id_usuario;
        req.adm = adm;
        next();
    });
}