import { Request, Response, NextFunction} from 'express';

export async function verificaAutorizacao(req : Request, res : Response, next: NextFunction) {
    if(!req.adm) return res.sendStatus(403);
    next()
}