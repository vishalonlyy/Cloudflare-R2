import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {  S3Client__, setS3 } from '../../functions/c';
/**Creating an instance using aws-sdk/client-s3 */
type data = {
    Region: string;
    Id: string;
    AccessKeyId: string;
    SecretAccessKey: string;
    Client: S3Client;

} 
class R2 {
    public data : data | never;
    /**Monit Instances */
    public logs: string[];
    constructor(data:data = {} as data) {
        this.data = {...data};
        this.logs = [];
    }

    /**Setters */

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


    public setSecret(secret: string) {
        this.data.SecretAccessKey = secret;
        return this;
    }

    public setAccessKey(key: string) {
        this.data.AccessKeyId = key;
        return this;
    }

    public build() {
        if (this.data.Region === undefined || this.data.Region === null) {
            this.data.Region = 'auto';
        }
        if (this.data.AccessKeyId && this.data.SecretAccessKey && this.data.Id) {
            this.data.Client = new S3Client({
                region: `${this.data.Region}`,
                endpoint: `https://${this.data.Id}.r2.cloudflarestorage.com`,
                credentials: {
                    accessKeyId: `${this.data.AccessKeyId}`,//2ea6c4096c9f29f3baceba5e7cd5ca85
                    secretAccessKey: `${this.data.SecretAccessKey}`//'5491e3a3c0ec2def42d6ea721efe87bae04071af492540a02367da962eeb0a49'
                }
            });
         setS3(this.data.Client);
        } else {
            throw new Error('You must set the access key, secret key and bucket id before building the client');
        }
        return this;
    }

     #gc(){
        return this;
    }
    public getClient(){
        return this.data.Client;
    }


}


export default R2;