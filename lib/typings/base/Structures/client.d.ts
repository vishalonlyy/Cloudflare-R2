import { S3Client } from '@aws-sdk/client-s3';
/**Creating an instance using aws-sdk/client-s3 */
type data = {
    Region: string;
    Id: string;
    AccessKeyId: string;
    SecretAccessKey: string;
    Client: S3Client;
};
declare class R2 {
    #private;
    data: data | never;
    /**Monit Instances */
    logs: string[];
    constructor(data?: data);
    /**Setters */
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
    setSecret(secret: string): this;
    setAccessKey(key: string): this;
    build(): this;
    getClient(): S3Client;
}
export default R2;
