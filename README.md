# Database file storage

## Install
```bash
npm i sequelize-db-storage-files
```

## Initialization
```ts
import { DbStorageFiles } from "sequelize-db-storage-files";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
        // ... options
});
    
const dbStorageFiles = new DbStorageFiles(sequelize);
await sequelize.sync();
```

## Create File
```ts
const file = await dbStorageFiles.write('/text.txt', Buffer.from('Hello, World!'));
```

## Get File
```ts
const file = await dbStorageFiles.getFromPath('/text.txt');
if(!file) throw new Error("Not found File");
const text = (await file.getFileData()).data.toString('utf-8'); 
console.log(text); // Hello, World!
```

## File Info
```ts
file.id // number
file.path // string
file.hash // string (sha256)
file.info // string (json)
file.size // number (bytes)
file.deletionDate // Date | null
file.createdAt // Date
file.updatedAt // Date
```

`DbStorageFile` and `DbStorageFileData` are sequelize models, so all the methods in the sequelize documentation apply to them