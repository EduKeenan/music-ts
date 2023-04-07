import express from 'express';
import userController from './controllers/userController';
import loginController from './controllers/loginController';
import playlistController from './controllers/playlistController';
import dotenv from 'dotenv';
dotenv.config();
import {connection} from './connection';
const app = express();

connection.sync().then(()=>{
    console.log(`Conexão com o banco estabelecida...`);
}).catch((erro)=> {
    console.log(`Erro na conexão com o banco...`, erro);
});

app.use(express.json());

app.use(playlistController);
app.use(userController);
app.use(loginController);

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}...`);
});