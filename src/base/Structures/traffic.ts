import { Utils, B_data } from "../modules/index.js";
class traffic {
    public data : B_data | never;
    private static _instance: traffic | null = null;
    constructor(data:B_data = {} as B_data) {
        if (traffic._instance) {
            return traffic._instance; // Return existing instance if available
          }
        traffic._instance = this;
        this.data = {...data};
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
    public bucketName(name : string){
        this.data.bucketName = name;
        return this;
    }
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload (Can be a file or an array of files)
     * @info 📢 Not suggested to be used without setting the bucket name i.e traffic.bucketName("bucketName")
     * @example     
     * ```ts
     * const traffic = new traffic();
     * traffic.bucketName("bucketName").upload(file);
     * or 
     * const traffic = new traffic()
     * .bucketName("bucketName")
     * .upload(file);
     * ```
     */
    public upload(data : any | any[]){
        if(!this.data.bucketName) throw new Error("Bucket name not set use .bucket() to set bucket name");
         Utils.FUpload(data,this.data.bucketName);
       return this; 
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
    get getbucketName(){
        return this.data.bucketName;
    }
}
export { traffic };