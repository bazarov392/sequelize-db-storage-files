import { Optional } from "sequelize"
import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript"
import { DbStorageFileData } from "./db-storage-file-data.entity"

export type DbStorageFileAttributes = {
    id: number
    path: string
    hash: string
    info: string
    size: number
    deletionDate: Date | null
}

export type DbStorageFileCreationAttributes = Optional<DbStorageFileAttributes, 'id'>;

@Table
export class DbStorageFile extends Model<DbStorageFileAttributes, DbStorageFileCreationAttributes>
{
    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare path: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare hash: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare info: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    declare size: number;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    declare deletionDate: Date | null;

    @HasOne(() => DbStorageFileData)
    declare fileData: DbStorageFileData
    declare getFileData: () => Promise<DbStorageFileData>
}