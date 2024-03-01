import { Utils, B_data, Traffic_UploadResponse } from "../modules/index.js";
import { Traffic_DeleteFileResponse } from "../typings/index.js";
class traffic {
    public data: B_data | never;
    public UploadedFiles: string[] = [];
    public DeletedFiles: string[] = [];
    private static _instance: traffic | null = null;
    constructor(data: B_data = {} as B_data) {
        if (traffic._instance) {
            return traffic._instance; // Return existing instance if available
        }
        traffic._instance = this;
        this.data = { ...data };
        this.data.bucketName = null;
    }
    /**
     * @description Use this to set the bucket name to be used bt the R2 Client in uploading files
     * @param name The name of the bucket to use
     * @info 📢 This method is required before uploading a file
     * @example
     * ```ts
     * const traffic = new traffic();
     * traffic.bucketName("bucketName");
     * or
     * const traffic = new traffic()
     * .bucketName("bucketName");
     * ```
     */
    public bucketName(name: string) {
        this.data.bucketName = name;
        return this;
    }
    /**
     * @description Use this to upload an raw image data without converting it to base64
     * @param x  The boolean to be used
     */
    public isBaase64(x?: boolean) {
        this.data.isbase64 = x;
        return this;
    }
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload (Can be a file or an array of files)
     * @info 📢 Not suggested to be used without setting the bucket name i.e traffic.bucketName("bucketName")
     * @returns ` { state: "suceess" | "failed";data: string of<Uploded FileName>; } `
     * @example     
     * ```ts
     * const traffic = new traffic();
     * traffic.bucketName("bucketName").upload(file).then((res)=>{console.log(res)});
     * or 
     * const traffic = new traffic()
     * .bucketName("bucketName")
     * .upload(file).then((res)=>{console.log(res)});
     * ```
     */
    public upload(data: any | any[]): Promise<any> {
        if (!this.data.bucketName) {
            return Promise.reject(new Error("Bucket name not set, use .bucket() to set the bucket name"));
        }
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Utils.FUpload(data, this.data.bucketName);
                resolve(result);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }


    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload (Must me in base64 format)
     * @info 📢 Not suggested to be used without setting the bucket name i.e traffic.bucketName("bucketName")
     * @example
     * ```ts
     * const traffic = new traffic();
     * traffic.bucketName("bucketName").uploadRaw([base64DataString]);
     * or
     * const traffic = new traffic()
     * .bucketName("bucketName")
     * .uploadRaw([base64DataString]);
     * ```
     */
    public uploadRaw(data: any | any[]): Promise<any> {
        if (!this.data.bucketName) {
            return Promise.reject(new Error("Bucket name not set, use .bucket() to set the bucket name"));
        }

        return new Promise(async (resolve, reject) => {
            try {
                const result = await Utils.UploadRaw(data, this.data.bucketName);
                resolve(result);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }

    /**
     * @description Delete a file from the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to delete (Can be a file or an array of files)
     * @info 📢 Not suggested to be used without setting the bucket name i.e traffic.bucketName("bucketName")
     * @returns ` { state: "suceess" | "failed";data: string of<Deleted FileNames>; } `
     * @example     
     * ```ts
     * const traffic = new traffic();
     * traffic.bucketName("bucketName").delete(file).then((res)=>{console.log(res)});
     * or 
     * const traffic = new traffic()
     * .bucketName("bucketName")
     * .delete(file).then((res)=>{console.log(res)});
     * ```
     */
    public delete(data: string | string[]): Promise<any> {
        let A_Data: string[] = Array.isArray(data) ? data : [data];
        if (!this.data.bucketName) throw new Error("Bucket name not set use .bucket() to set bucket name");
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Utils.Delete(this.data.bucketName, A_Data);
                resolve(result);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }

    /**
     * @description Get the files in the bucket
     * @param bucketName The name of the bucket to get the files from
     * @returns An array of file names
     * @example
     * ```ts
     * const traffic = new traffic();
     * traffic.getFiles("bucketName").then((files)=>{console.log(files)});
     * or
     * const traffic = new traffic()
     * .getFiles("bucketName").then((files)=>{console.log(files)});
     * ```
     */
    public getFiles(bucketName: string) {
        return Utils.RetriveFiles(bucketName);
    }

    /**
     * @description Get the bucket name which is being used by the R2 instance
     * @returns The bucket name which is being used by the R2 instance
     * @example
     * ```ts
     * const traffic = new traffic()
     * .bucketName("bucketName");
     * 
     * traffic.getbucketName();
     * ```
     */
    get getbucketName() {
        return this.data.bucketName;
    }
    /**
     * Get the array of uploaded file names.
     * @returns An array containing the names of uploaded files.
     * @example
     * ```ts
     * const traffic = new traffic()
     *   .bucketName("bucketName")
     *   .uploadRaw([base64DataString]); or .upload([file]); <<Any of the two can be used to upload a file>>
     * 
     * const uploadedFiles = traffic.getUploadedFiles();
     * console.log('Uploaded Files:', uploadedFiles);
     * ```
     */
    public async getUploadedFiles() {
        return this.UploadedFiles;
    }
}
export { traffic };