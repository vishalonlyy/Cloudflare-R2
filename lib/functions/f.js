"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const tslib_1 = require("tslib");
const client_s3_1 = require("@aws-sdk/client-s3");
const client_1 = tslib_1.__importDefault(require("../base/Structures/client"));
const mime_types_1 = tslib_1.__importDefault(require("mime-types"));
const c_1 = require("./c");
class Utils {
    static xInstance = null;
    static getXInstance() {
        if (!this.xInstance) {
            this.xInstance = new client_1.default();
        }
        return this.xInstance;
    }
    static async getExc(data) {
        const extension = data.match(/data:image\/([a-zA-Z+]+);base64,/)?.[1];
        return extension ? extension.toLowerCase() : null;
    }
    static getType(extension) {
        const type = `${extension}`;
        return mime_types_1.default.lookup(type) || 'application/octet-stream';
    }
    static async FUpload(data, Bn) {
        if (data instanceof Array) {
        }
        else {
            const fileExtension = await this.getExc(data);
            const z = `${fileExtension}`;
            const fileType = await this.getType(z) || 'application/octet-stream';
            //Generate random string of 20 characters A-z
            const length = await this.RadmonSelection();
            const randomString = await this.StringGenerator(length);
            const bucketName = Bn;
            const fileName = randomString;
            await this.System_U(bucketName, fileName, data, fileType).then(() => {
                console.log(`File Uploaded to ${bucketName} with name ${fileName}`);
            });
        }
    }
    static async System_U(BN, FN, D, FT) {
        const Cmd = new client_s3_1.PutObjectCommand({
            Bucket: BN,
            Key: FN,
            Body: D,
            ContentType: FT
        });
        try {
            const s3 = await (0, c_1.getS3)();
            // console.log(r2);
            // console.log(await r2.getClient())
            // const client = r2.data.Client;
            // console.log(client)
            const { ETag } = await s3.send(Cmd);
            return true;
        }
        catch (err) {
            console.log(err);
            // throw new Error(err);
        }
    }
    /** */
    static async StringGenerator(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        }
        return result;
    }
    static async RadmonSelection() {
        const min = 30;
        const max = 40;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=f.js.map