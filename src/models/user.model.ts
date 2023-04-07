import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: `usuario`,
    timestamps: false
})
export class Usuario extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        nome!: string;
      
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        email!: string;  
        
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        senha!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        role!: `ADMIN` | `USER`;    
}

