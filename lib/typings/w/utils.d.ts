import { R2 } from "../base/modules";
/**
 * @description The Utils class
 * @class Utils
 */
export declare class Utils {
    private static xInstance;
    /**
     * @description Get the instance of R2
     * @returns R2 Instance
     */
    static getXInstance(): R2;
    /**
     * @description Get the extension of the file
     * @param data The file to get the extension from
     * @returns The extension of the file
     */
    static getExc(data: any): Promise<any>;
    /**
     * @description Get the type of the file
     * @param extension The extension of the file
     * @returns The type of the file
     */
    static getType(extension: string): any;
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload
     * @param Bn The bucket name to upload the file to
     */
    static UploadRaw(data: any, Bn: string): void;
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload
     * @param Bn The bucket name to upload the file to
     */
    static FUpload(data: any | any[], Bn: string): void;
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload
     * @param Bn The bucket name to upload the file to
     * @param fileName The name of the file to upload
     */
    static System_U(BN: string, FN: string, D: any, FT: string): Promise<void>;
    /**
     * @description Generate a random string of characters
     * @param length The length of the string to generate
     * @returns The generated string
     */
    static StringGenerator(length: any): Promise<string>;
    /**
     * @description Generate a random number between 30 and 40
     * @returns The generated number
     */
    static RadmonSelection(): Promise<number>;
}
