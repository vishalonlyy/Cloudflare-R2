import { B_data } from "../modules/index.js";
declare class traffic {
    data: B_data | never;
    UploadedFiles: string[];
    private static _instance;
    constructor(data?: B_data);
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
    bucketName(name: string): this;
    /**
     * @description Use this to upload an raw image data without converting it to base64
     * @param x  The boolean to be used
     */
    isBaase64(x?: boolean): this;
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
    upload(data: any | any[]): Promise<any>;
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
    uploadRaw(data: any | any[]): Promise<any>;
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
    get getbucketName(): string;
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
    getUploadedFiles(): Promise<string[]>;
}
export { traffic };
