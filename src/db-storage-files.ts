import { Sequelize } from "sequelize-typescript";
import { DbStorageFile } from "./entities/db-storage-file.entity";
import { DbStorageFileData } from "./entities/db-storage-file-data.entity";
import { WriteOtherParams } from "./interfaces/db-storage-files-params";
import { createHash } from "crypto";

export class DbStorageFiles
{
    constructor(sequelize: Sequelize) 
    {
        sequelize.addModels([DbStorageFile, DbStorageFileData]);
    }

    async containsPath(path: string)
    {
        return (await DbStorageFile.count({where: {path}})) > 0;
    }

    async containsId(id: string)
    {
        return (await DbStorageFile.count({where: {id}})) > 0;
    }

    async getFromPath(path: string)
    {
        return await DbStorageFile.findOne({where: {path}});
    }

    async getFromId(id: string)
    {
        return await DbStorageFile.findOne({where: {id}});
    }

    async write(path: string, data: Buffer, otherParams?: WriteOtherParams)
    {
        let file: DbStorageFile | null = null;
        file = await DbStorageFile.findOne({
            where: {path}
        });

        const params = {
            size: data.byteLength,
            hash: createHash('sha256').update(data).digest('hex'),
            deletionDate: (otherParams?.deletionDate)
                ? otherParams.deletionDate
                : null,
            info: (otherParams?.info)
                ? JSON.stringify(otherParams.info)
                : '{}'
        };

        if(file)
        {
            await Promise.all([
                file.update(params),
                DbStorageFileData.update({data}, {where: {fileId: file.id}})
            ]);
        }
        else
        {
            await DbStorageFile.create({
                path,
                ...params
            });

            file = await DbStorageFile.findOne({
                where: {path}
            });
            if(!file) throw new Error("Not found file");

            await DbStorageFileData.create({
                fileId: file.id,
                data: data
            });
        }

        return file;
    }
}
