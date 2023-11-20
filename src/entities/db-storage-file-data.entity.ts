import { Optional } from "sequelize"
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { DbStorageFile } from "./db-storage-file.entity"

export type DbStorageFileDataAttributes = {
    id: number
    fileId: number
    data: Buffer
}

export type DbStorageFileDataCreationAttributes = Optional<DbStorageFileDataAttributes, 'id'>

@Table
export class DbStorageFileData extends Model<DbStorageFileDataAttributes, DbStorageFileDataCreationAttributes>
{
    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    })
    declare id: number

    @ForeignKey(() => DbStorageFile)
    @Column({type: DataType.BIGINT, unique: true})
    declare fileId: number

    @BelongsTo(() => DbStorageFile)
    declare fileInfo: DbStorageFile
    declare getFileInfo: () => Promise<DbStorageFile>

    @Column({type: DataType.BLOB('tiny')})
    declare data: Buffer
}