import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as path from "path"
import * as fs from "fs"
import * as uuid from "uuid"

export interface ICreatedFile {
    path: string
    name: string
}

@Injectable()
export class FileService {


    createFile(filePath: string, file, name: string): ICreatedFile {
        try {
            const fileExtension = file.originalname.split(".").pop()
            const fileName = name + "." + fileExtension
            const fullFilePAth = path.resolve(__dirname, "..", "static", filePath)
            if (!fs.existsSync(fullFilePAth)) {
                fs.mkdirSync(fullFilePAth, {recursive: true})
            }
            fs.writeFileSync(path.resolve(fullFilePAth, fileName), file.buffer)
            return {
                path: fullFilePAth,
                name: fileName
            }
        } catch (e) {
            // @ts-ignore
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile () {

    }
}