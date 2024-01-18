
import { S3Client, setS3, R2_Instance_StoreData } from "../modules/index"
/**Creating an instance using aws-sdk/client-s3 */
class R2 {
    public data: R2_Instance_StoreData<S3Client> | never;
    /**Monit Instances 
    * @description Logs are stored here
    */
    public logs: string[];
    constructor(data: R2_Instance_StoreData<S3Client> = {} as R2_Instance_StoreData<S3Client>) {
        this.data = { ...data };
        this.logs = [];
    }
    /**
         * @param region The region to set for the traffic
         * @description Set the region to be used
         * @example east-1 | auto | anything else
         */
    public setRegion(region: string) {
        this.data.Region = region;
        // this.Region = region;
        return this;
    }
    /**
     * 
     * @param id The Bucket id (Its usually your account id for R2)
     * @description Set the bucket id to be used
     * @description <How to get bucket id> follow the link below
     * @link <How to get bucket id>
     */
    public setId(id: string) {
        this.data.Id = id;
        return this;
    }
    /**
     * 
     * @param secret The secret key to be used
     * @description Set the secret key to be used
     * @description <How to get secret key> follow the link below
     * @link <How to get secret key>
     */
    public setSecret(secret: string) {
        this.data.SecretAccessKey = secret;
        return this;
    }
    /**
     * 
     * @param key The access key to be used
     * @description Set the access key to be used
     * @description <How to get access key> follow the link below
     * @link <How to get access key>
     */
    public setAccessKey(key: string) {
        this.data.AccessKeyId = key;
        return this;
    }
    /**
     * @description Build the R2 instance Client using the data provided 
     * @returns The R2 instance Client
     */
    public build() {
        if (this.data.Region === undefined || this.data.Region === null) {
            this.data.Region = 'auto';
        }
        if (this.data.AccessKeyId && this.data.SecretAccessKey && this.data.Id) {
            this.data.Client = new S3Client({
                region: `${this.data.Region}`,
                endpoint: `https://${this.data.Id}.r2.cloudflarestorage.com`,
                credentials: {
                    accessKeyId: `${this.data.AccessKeyId}`,
                    secretAccessKey: `${this.data.SecretAccessKey}`
                }
            });
            (setS3(this.data.Client)).catch(err => {
                throw new Error(err);
            });
        } else {
            throw new Error('You must set the access key, secret key and bucket id before building the client');
        }
        return this;
    }
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
    public getClient() {
        return this.data.Client;
    }
}
export { R2 };