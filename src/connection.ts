import  {Sequelize}  from 'sequelize-typescript';
import {Usuario} from './models/user.model';
import { Login } from './models/login.model';
import { Musicas, Playlist, PlaylistMusica } from './models/playlist.model';
export const connection = new Sequelize(
    {
        database: process.env.DB_SCHEMA,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: `mariadb`,
        port: 3306,
        models: [Usuario, Login, Playlist, PlaylistMusica, Musicas]
    }
);
