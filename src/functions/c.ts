import { S3Client } from "@aws-sdk/client-s3";
import R2 from "../base/Structures/client";

let S3Client__ : S3Client;
async function setS3(data:S3Client){
    S3Client__ = data;
}

async function getS3(){
    return S3Client__;
}

export {S3Client__, setS3, getS3}