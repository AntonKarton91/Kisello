"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
let FileService = class FileService {
    createFile(filePath, file, name) {
        try {
            const fileExtension = file.originalname.split(".").pop();
            const fileName = name + "." + fileExtension;
            const fullFilePAth = path.resolve(__dirname, "..", "static", filePath);
            if (!fs.existsSync(fullFilePAth)) {
                fs.mkdirSync(fullFilePAth, { recursive: true });
            }
            fs.writeFileSync(path.resolve(fullFilePAth, fileName), file.buffer);
            return {
                path: fullFilePAth,
                name: fileName
            };
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    removeFile() {
    }
};
FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map