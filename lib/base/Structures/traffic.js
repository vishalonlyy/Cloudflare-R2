"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traffic = void 0;
const f_js_1 = require("../../functions/f.js");
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
    bucketName(name) {
        this.data.bucketName = name;
        return this;
    }
    async upload(data) {
        if (!this.data.bucketName)
            throw new Error("Bucket name not set use .bucket() to set bucket name");
        await f_js_1.Utils.FUpload(data, this.getbucketName);
        return this;
    }
    //Left here
    get getbucketName() {
        return this.data.bucketName;
    }
}
exports.traffic = traffic;
//# sourceMappingURL=traffic.js.map