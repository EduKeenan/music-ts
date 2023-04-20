import express from 'express';
import userController from './controllers/userController';
import loginController from './controllers/loginController';
import playlistController from './controllers/playlistController';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import {connection} from './connection';
import musicaController from './controllers/musicaController';
const app = express();

connection.sync().then(()=>{
    console.log(`Conexão com o banco estabelecida...`);
}).catch((erro)=> {
    console.log(`Erro na conexão com o banco...`, erro);
});
app.use(cors())
app.use(express.json());

app.use(playlistController);
app.use(musicaController);
app.use(userController);
app.use(loginController);

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}...`);
});