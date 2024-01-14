"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traffic = void 0;
const index_js_1 = require("../modules/index.js");
class traffic {
    data;
    static _instance = null;
    constructor(data = {}) {
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
    bucketName(name) {
        this.data.bucketName = name;
        return this;
    }
    /**
     * @description Use this to upload an raw image data without converting it to base64
     * @param x  The boolean to be used
     */
    isBaase64(x) {
        this.data.isbase64 = x;
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
    upload(data) {
        if (!this.data.bucketName)
            throw new Error("Bucket name not set use .bucket() to set bucket name");
        index_js_1.Utils.FUpload(data, this.data.bucketName);
        return this;
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
    uploadRaw(data) {
        if (!this.data.bucketName)
            throw new Error("Bucket name not set use .bucket() to set bucket name");
        index_js_1.Utils.UploadRaw(data, this.data.bucketName);
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
    get getbucketName() {
        return this.data.bucketName;
    }
}
exports.traffic = traffic;
//# sourceMappingURL=traffic.js.map