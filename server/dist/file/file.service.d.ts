export interface ICreatedFile {
    path: string;
    name: string;
}
export declare class FileService {
    createFile(filePath: string, file: any, name: string): ICreatedFile;
    removeFile(): void;
}
