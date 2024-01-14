import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { S3Client__, setS3 } from '../../w/c';
import { R2_Instance_StoreData, B_data } from '../typings';
import { Utils } from '../../w/utils';
import { R2 } from "../Structures/client";
import mime from "mime-types";
import { getS3 } from "../../w/c";
export type { R2_Instance_StoreData, B_data };
export { S3Client, PutObjectCommand, mime, 
/**Dev Modules */
S3Client__, setS3, Utils, R2, getS3 };
