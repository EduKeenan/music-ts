import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: `musicas`,
    timestamps: false
})
export class Musicas extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        musica!: string;
      
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        artista!: string;     
}

