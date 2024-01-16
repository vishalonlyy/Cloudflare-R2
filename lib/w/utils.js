"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const tslib_1 = require("tslib");
const modules_1 = require("../base/modules");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const traffic_1 = require("../base/Structures/traffic");
/**
 * @description The Utils class
 * @class Utils
 */
class Utils {
    static xInstance = null;
    static TrafficInstance = new traffic_1.traffic();
    /**
     * @description Get the instance of R2
     * @returns R2 Instance
     */
    static getXInstance() {
        if (!this.xInstance) {
            this.xInstance = new modules_1.R2();
        }
        return this.xInstance;
    }
    /**
     * @description Get the instance of traffic
     * @returns traffic Instance
     */
    static getTrafficInstance() {
        return this.TrafficInstance;
    }
    /**
     * @description Get the extension of the file
     * @param data The file to get the extension from
     * @returns The extension of the file
     */
    static async getExc(data) {
        const extension = data.match(/data:image\/([a-zA-Z+]+);base64,/)?.[1];
        return extension ? extension.toLowerCase() : null;
    }
    /**
     * @description Get the type of the file
     * @param extension The extension of the file
     * @returns The type of the file
     */
    static getType(extension) {
        const type = `${extension}`;
        return modules_1.mime.lookup(type) || 'application/octet-stream';
    }
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload while its in the raw format
     * @param Bn The bucket name to upload the file to
     *
     */
    static async UploadRaw(data, Bn) {
        if (!Bn)
            throw new Error("Bucket name not set use .bucket() to set bucket name");
        const uploadedFiles = [];
        for (let i = 0; i < data.length; i++) {
            const fileExtension = await Utils.getExc(data[i]);
            const z = `${fileExtension}`;
            const fileType = (await Utils.getType(z)) || 'application/octet-stream';
            const length = await Utils.RadmonSelection();
            const randomString = await Utils.StringGenerator(length);
            const bucketName = Bn;
            const fileName = randomString;
            const ext = '.' + fileType.split("/")[1];
            const Bstring = data[i];
            const B64Content = Bstring.split("base64,")[1];
            await Utils.System_U(bucketName, fileName + ext, Buffer.from(B64Content, 'base64'), fileType);
            await Utils.TrafficInstance.UploadedFiles.push(fileName + ext);
            const l = `[Raw] File Uploaded to Bucket::${bucketName + " Type : " + fileType} with name ${fileName + ext} [${i + 1}/${data.length}]`;
            Promise.resolve(Utils.getXInstance().logs.push(l)).then(() => {
                console.log(l);
                uploadedFiles.push({ state: "success", data: `${fileName + ext}` });
            }).catch((err) => {
                console.log(err);
            });
        }
        return uploadedFiles;
    }
    /**
     * @description Convert a file to base64 format
     * @param filePath The path of the file to convert to base64
     * @returns The converted file
     */
    static async convertToBase64(filePath) {
        try {
            const data = await fs_1.default.promises.readFile(filePath);
            const extension = path_1.default.extname(filePath).substr(1);
            const base64Data = data.toString("base64");
            const dataUrl = `data:image/${extension};base64,${base64Data}`;
            return { state: "success", filePath, dataUrl };
        }
        catch (err) {
            console.error(`Error reading the file ${filePath}:`, err);
            return { state: "failed", filePath, dataUrl: null };
        }
    }
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload
     * @param Bn The bucket name to upload the file to
     */
    static async FUpload(data, Bn) {
        try {
            const base64DataArray = await Promise.all(data.map(filePath => Utils.convertToBase64(filePath)));
            const uploadedFiles = [];
            for (let i = 0; i < base64DataArray.length; i++) {
                const fileExtension = await Utils.getExc(base64DataArray[i].dataUrl);
                const z = `${fileExtension}`;
                const fileType = (await Utils.getType(z)) || 'application/octet-stream';
                const length = await Utils.RadmonSelection();
                const randomString = await Utils.StringGenerator(length);
                const bucketName = Bn;
                const fileName = randomString;
                const ext = path_1.default.extname(data[i]);
                const Bstring = base64DataArray[i].dataUrl;
                const B64Content = Bstring.split("base64,")[1];
                await Utils.System_U(bucketName, fileName + ext, Buffer.from(B64Content, 'base64'), fileType);
                await Utils.TrafficInstance.UploadedFiles.push(fileName + ext);
                const l = `[Default] File Uploaded to Bucket::${bucketName + " Type : " + fileType} with name ${fileName}${ext} [${i + 1}/${base64DataArray.length}]`;
                Promise.resolve(Utils.getXInstance().logs.push(l)).then(() => {
                    console.log(l);
                    uploadedFiles.push({ state: "success", data: `${fileName + ext}` });
                    // return { state: "success", data: `${fileName + ext}` } as any;
                }).catch((err) => {
                    console.log(err);
                });
            }
            return uploadedFiles;
        }
        catch (err) {
            console.log(err);
        }
    }
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload
     * @param Bn The bucket name to upload the file to
     * @param fileName The name of the file to upload
     */
    static async System_U(BN, FN, D, FT) {
        const Cmd = await new modules_1.PutObjectCommand({
            Bucket: BN,
            Key: FN,
            Body: D,
            ContentType: FT
        });
        const s3 = await (0, modules_1.getS3)();
        const { ETag } = await s3.send(Cmd);
    }
    /**
     * @description Generate a random string of characters
     * @param length The length of the string to generate
     * @returns The generated string
     */
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
    /**
     * @description Generate a random number between 30 and 40
     * @returns The generated number
     */
    static async RadmonSelection() {
        const min = 30;
        const max = 40;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map