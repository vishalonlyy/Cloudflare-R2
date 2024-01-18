import { S3Client } from "../base/modules/index";
/**
 * @description Creating a permanent instance of S3Client to be used in the application
 * @param data The S3Client instance to be used
 * @returns The S3Client instance to be used
 */
declare let S3Client__: S3Client;
declare function setS3(data: S3Client): Promise<void>;
declare function getS3(): Promise<S3Client>;
export { S3Client__, setS3, getS3 };
