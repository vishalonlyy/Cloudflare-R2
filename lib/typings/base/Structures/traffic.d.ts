type B_data = {
    bucketName: string;
};
declare class traffic {
    data: B_data | never;
    private static _instance;
    constructor(data?: B_data);
    bucketName(name: string): this;
    upload(data: any | any[]): Promise<this>;
    get getbucketName(): string;
}
export { traffic };
