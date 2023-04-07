import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: `playlists`,
    timestamps: false
})
export class Playlist extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    })
        id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        nome!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
        id_usuario!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        genero!: string;

}

@Table({
    tableName: `playlists_musicas`,
    timestamps: false
})
export class PlaylistMusica extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    })
        id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
        id_playlist!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
        id_musica!: number;
}

@Table({
    tableName: `musicas`,
    timestamps: false
})
export class Musicas extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    })
        id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
        musica!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
        artista!: string;
}