import { S3Client } from "../base/modules/index";
/**
 * @description Creating a permanent instance of S3Client to be used in the application
 * @param data The S3Client instance to be used
 * @returns The S3Client instance to be used
 */
let S3Client__: S3Client;
async function setS3(data: S3Client) {
    S3Client__ = data;
}
async function getS3() {
    return S3Client__;
}
export { S3Client__, setS3, getS3 }