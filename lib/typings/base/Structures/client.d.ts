import { S3Client, R2_Instance_StoreData } from "../modules/index";
/**Creating an instance using aws-sdk/client-s3 */
declare class R2 {
    data: R2_Instance_StoreData<S3Client> | never;
    /**Monit Instances
    * @description Logs are stored here
    */
    logs: string[];
    constructor(data?: R2_Instance_StoreData<S3Client>);
    /**
         * @param region The region to set for the traffic
         * @description Set the region to be used
         * @example east-1 | auto | anything else
         */
    setRegion(region: string): this;
    /**
     *
     * @param id The Bucket id (Its usually your account id for R2)
     * @description Set the bucket id to be used
     * @description <How to get bucket id> follow the link below
     * @link <How to get bucket id>
     */
    setId(id: string): this;
    /**
     *
     * @param secret The secret key to be used
     * @description Set the secret key to be used
     * @description <How to get secret key> follow the link below
     * @link <How to get secret key>
     */
    setSecret(secret: string): this;
    /**
     *
     * @param key The access key to be used
     * @description Set the access key to be used
     * @description <How to get access key> follow the link below
     * @link <How to get access key>
     */
    setAccessKey(key: string): this;
    /**
     * @description Build the R2 instance Client using the data provided
     * @returns The R2 instance Client
     */
    build(): this;
    /**
     * @description Use this to get the R2 instance Client
     * @info 📢 This method is suggested to be used after building the R2 instance
     * @example
     * ```ts
     * # Building the R2 instance
     * const client = new R2();
     * client.setSecret("<secret goes here>").setAccessKey("<access key goes here>").setId("<bucket id goes here>").build();
     * ## Then using the getClient method
     * client.getClient();
     * -----------------Or-----------------
     * const client = new R2()
     * .setSecret("<secret goes here>")
     * .setAccessKey("<access key goes here>")
     * .setId("<bucket id goes here>")
     * .build();
     * ## Then using the getClient method
     * client.getClient();
     *
     * ```
     */
    getClient(): S3Client;
}
export { R2 };
