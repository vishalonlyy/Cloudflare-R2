import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import R2 from "../base/Structures/client";
import mime from "mime-types";
import { getS3 } from "./c";
export class Utils {
    private static xInstance: R2 | null = null;
    public static getXInstance(): R2 {
        if (!this.xInstance) {
            this.xInstance = new R2();
        }
        return this.xInstance;
    }
    public static async getExc(data: any) {
        const extension = data.match(/data:image\/([a-zA-Z+]+);base64,/)?.[1];
        return extension ? extension.toLowerCase() : null;
    }

    public static getType(extension: string) {
        const type = `${extension}`
        return mime.lookup(type) || 'application/octet-stream';
    }
    public static async FUpload(data: any | any[], Bn: string) {
        if (data instanceof Array) {

        } else {

            const fileExtension: any = await this.getExc(data);
            const z = `${fileExtension}`
            const fileType = await this.getType(z) || 'application/octet-stream';


            //Generate random string of 20 characters A-z
            const length = await this.RadmonSelection();
            const randomString = await this.StringGenerator(length);
            const bucketName = Bn;
            const fileName = randomString;

            await this.System_U(bucketName, fileName, data, fileType).then(()=>{
                console.log(`File Uploaded to ${bucketName} with name ${fileName}`);
            });

        }

    }


    public static async System_U(BN: string, FN: string, D: any, FT: string) {
        const Cmd: PutObjectCommand = new PutObjectCommand({
            Bucket: BN,
            Key: FN,
            Body: D,
            ContentType: FT
        })
        try {
            const s3: S3Client = await getS3();
            // console.log(r2);
            // console.log(await r2.getClient())
            // const client = r2.data.Client;
            // console.log(client)
            const { ETag } = await s3.send(Cmd);
            return true;
        } catch (err) {
            console.log(err)
            // throw new Error(err);
        }
    }


    /** */
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

    public static async RadmonSelection() {
        const min = 30;
        const max = 40;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;

    }

}
