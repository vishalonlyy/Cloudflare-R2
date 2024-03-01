import {
    R2,
    mime,
    getS3,
    PutObjectCommand,
    DeleteObjectCommand,
    S3Client,
    Traffic_UploadResponse,
    ListObjectsCommand
} from "../base/modules";
import fs from "fs";
import path from "path";
import { traffic } from "../base/Structures/traffic";
import { Traffic_DeleteFileResponse } from "../base/typings";
/**
 * @description The Utils class
 * @class Utils
 */
export class Utils {
    private static xInstance: R2 | null = null;
    private static TrafficInstance: traffic = new traffic();
    /**
     * @description Get the instance of R2
     * @returns R2 Instance
     */
    public static getXInstance(): R2 {
        if (!this.xInstance) {
            this.xInstance = new R2();
        }
        return this.xInstance;
    }

    /**
     * @description Get the instance of traffic
     * @returns traffic Instance
     */
    public static getTrafficInstance(): traffic {
        return this.TrafficInstance;
    }
    /**
     * @description Get the extension of the file
     * @param data The file to get the extension from
     * @returns The extension of the file
     */
    public static async getExc(data: any) {
        const extension = data.match(/data:image\/([a-zA-Z+]+);base64,/)?.[1];
        return extension ? extension.toLowerCase() : null;
    }
    /**
     * @description Get the type of the file
     * @param extension The extension of the file
     * @returns The type of the file
     */
    public static getType(extension: string) {
        const type = `${extension}`
        return mime.lookup(type) || 'application/octet-stream';
    }
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload while its in the raw format
     * @param Bn The bucket name to upload the file to
     * 
     */
    public static async UploadRaw(data: any, Bn: string) {
        if (!Bn) throw new Error("Bucket name not set use .bucket() to set bucket name");
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
                uploadedFiles.push({ state: "success", data: `${fileName + ext}` } as Traffic_UploadResponse);
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
    public static async convertToBase64(filePath): Promise<{ state: string; filePath: string; dataUrl: string | null }> {
        try {
            const data = await fs.promises.readFile(filePath);
            const extension = path.extname(filePath).substr(1);
            const base64Data = data.toString("base64");
            const dataUrl = `data:image/${extension};base64,${base64Data}`;
            return { state: "success", filePath, dataUrl };
        } catch (err) {
            console.error(`Error reading the file ${filePath}:`, err);
            return { state: "failed", filePath, dataUrl: null };
        }
    }
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload
     * @param Bn The bucket name to upload the file to
     */
    public static async FUpload(data: any | any[], Bn: string) {
        try {
            const base64DataArray = await Promise.all(data.map(filePath => Utils.convertToBase64(filePath)));
            let uploadedFiles = [];
            for (let i = 0; i < base64DataArray.length; i++) {
                const fileExtension = await Utils.getExc(base64DataArray[i].dataUrl);
                const z = `${fileExtension}`;
                const fileType = (await Utils.getType(z)) || 'application/octet-stream';
                const length = await Utils.RadmonSelection();
                const randomString = await Utils.StringGenerator(length);
                const bucketName = Bn;
                const fileName = randomString;
                const ext = path.extname(data[i]);
                const Bstring = base64DataArray[i].dataUrl;
                const B64Content = Bstring.split("base64,")[1];
                await Utils.System_U(bucketName, fileName + ext, Buffer.from(B64Content, 'base64'), fileType);
                await Utils.TrafficInstance.UploadedFiles.push(fileName + ext);
                const l = `[Default] File Uploaded to Bucket::${bucketName + " Type : " + fileType} with name ${fileName}${ext} [${i + 1}/${base64DataArray.length}]`;
                Promise.resolve(Utils.getXInstance().logs.push(l)).then(() => {
                    console.log(l);
                    uploadedFiles.push({ state: "success", data: `${fileName + ext}` } as Traffic_UploadResponse);
                    // return { state: "success", data: `${fileName + ext}` } as any;
                }).catch((err) => {
                    console.log(err);
                });
            }
            return uploadedFiles;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * @description Delete a file from the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param Bn The bucket name to delete the file from
     * @param Fn The name of the file to delete
     */
    public static async Delete(Bn: string, Fn: string[]) {
        if (!Bn) throw new Error("Bucket name not set use .bucket() to set bucket name");
        const s3: S3Client = await getS3();
        let DeletedFiles = [];
        for (const fileName of Fn) {
            const params = {
                Bucket: Bn,
                Key: fileName
            };
            await s3.send(new DeleteObjectCommand(params));
            await Utils.TrafficInstance.DeletedFiles.push(fileName);
            const l = `File Deleted from Bucket::${Bn} with name ${fileName}`;
            Promise.resolve(Utils.getXInstance().logs.push(l)).then(() => {
                console.log(l);
                DeletedFiles.push({ state: "success", data: fileName } as Traffic_DeleteFileResponse);
            }).catch((err) => {
                console.log(err);
            });
        }
        return DeletedFiles;
    }

    /**
     * @description Retrieve all the files in the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param Bn The bucket name to retrieve the files from
     */
    public static async RetriveFiles(Bn: string) {
        try {
            const s3: S3Client = await getS3();
            const params = {
                Bucket: Bn
            };
            const { Contents } = await s3.send(new ListObjectsCommand(params));
            const files = Contents.map((file) => file.Key);
            return files;
        } catch (err) {
            console.log(err);
        }
    }
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload
     * @param Bn The bucket name to upload the file to
     * @param fileName The name of the file to upload
     */
    public static async System_U(BN: string, FN: string, D: any, FT: string) {
        const Cmd: PutObjectCommand = await new PutObjectCommand({
            Bucket: BN,
            Key: FN,
            Body: D,
            ContentType: FT
        })
        const s3: S3Client = await getS3();
        const { ETag } = await s3.send(Cmd);
    }
    /**
     * @description Generate a random string of characters
     * @param length The length of the string to generate
     * @returns The generated string
     */
    public static async StringGenerator(length: any) {
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
    public static async RadmonSelection() {
        const min = 30;
        const max = 40;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }
}
