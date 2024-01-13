"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const c_1 = require("../../functions/c");
class R2 {
    data;
    /**Monit Instances */
    logs;
    constructor(data = {}) {
        this.data = { ...data };
        this.logs = [];
    }
    /**Setters */
    /**
         * @param region The region to set for the traffic
         * @description Set the region to be used
         * @example east-1 | auto | anything else
         */
    setRegion(region) {
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
    setId(id) {
        this.data.Id = id;
        return this;
    }
    setSecret(secret) {
        this.data.SecretAccessKey = secret;
        return this;
    }
    setAccessKey(key) {
        this.data.AccessKeyId = key;
        return this;
    }
    build() {
        if (this.data.Region === undefined || this.data.Region === null) {
            this.data.Region = 'auto';
        }
        if (this.data.AccessKeyId && this.data.SecretAccessKey && this.data.Id) {
            this.data.Client = new client_s3_1.S3Client({
                region: `${this.data.Region}`,
                endpoint: `https://${this.data.Id}.r2.cloudflarestorage.com`,
                credentials: {
                    accessKeyId: `${this.data.AccessKeyId}`,
                    secretAccessKey: `${this.data.SecretAccessKey}` //'5491e3a3c0ec2def42d6ea721efe87bae04071af492540a02367da962eeb0a49'
                }
            });
            (0, c_1.setS3)(this.data.Client);
        }
        else {
            throw new Error('You must set the access key, secret key and bucket id before building the client');
        }
        return this;
    }
    #gc() {
        return this;
    }
    getClient() {
        return this.data.Client;
    }
}
exports.default = R2;
//# sourceMappingURL=client.js.map