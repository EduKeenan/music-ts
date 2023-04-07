import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: `token_logout`,
    timestamps: false
})
export class Login extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
        token!: string;
}