type B_data = {
    bucketName: string;
    isbase64: boolean;
}
/**
 * @description The data to be stored in the R2 instance
 * @param Region The region to be used
 * @param Id The bucket id to be used
 * @param AccessKeyId The access key to be used
 * @param SecretAccessKey The secret key to be used
 * @param Client The S3Client instance to be used
 */
type R2_Instance_StoreData<T> = {
    Region: string;
    Id: string;
    AccessKeyId: string;
    SecretAccessKey: string;
    Client: T;
}

type Traffic_UploadResponse = {
    state : "success" | "failed";
    data : string;
}

type Traffic_DeleteFileResponse = {
    state : "success" | "failed";
    data : string;
}
export type {
    B_data,
    R2_Instance_StoreData,
    Traffic_UploadResponse,
    Traffic_DeleteFileResponse
};