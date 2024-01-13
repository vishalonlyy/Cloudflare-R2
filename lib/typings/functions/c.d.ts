import { S3Client } from "@aws-sdk/client-s3";
declare let S3Client__: S3Client;
declare function setS3(data: S3Client): Promise<void>;
declare function getS3(): Promise<S3Client>;
export { S3Client__, setS3, getS3 };
