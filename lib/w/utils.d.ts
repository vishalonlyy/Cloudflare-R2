import { R2 } from "../base/modules";
import { traffic } from "../base/Structures/traffic";
/**
 * @description The Utils class
 * @class Utils
 */
export declare class Utils {
    private static xInstance;
    private static TrafficInstance;
    /**
     * @description Get the instance of R2
     * @returns R2 Instance
     */
    static getXInstance(): R2;
    /**
     * @description Get the instance of traffic
     * @returns traffic Instance
     */
    static getTrafficInstance(): traffic;
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
     * @param data The file to upload while its in the raw format
     * @param Bn The bucket name to upload the file to
     *
     */
    static UploadRaw(data: any, Bn: string): Promise<any[]>;
    /**
     * @description Convert a file to base64 format
     * @param filePath The path of the file to convert to base64
     * @returns The converted file
     */
    static convertToBase64(filePath: any): Promise<{
        state: string;
        filePath: string;
        dataUrl: string | null;
    }>;
    /**
     * @description Upload a file to the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param data The file to upload
     * @param Bn The bucket name to upload the file to
     */
    static FUpload(data: any | any[], Bn: string): Promise<any[]>;
    /**
     * @description Delete a file from the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param Bn The bucket name to delete the file from
     * @param Fn The name of the file to delete
     */
    static Delete(Bn: string, Fn: string[]): Promise<any[]>;
    /**
     * @description Retrieve all the files in the bucket specified using R2 instance built with the builder i.e <b>R2<b/>
     * @param Bn The bucket name to retrieve the files from
     */
    static RetriveFiles(Bn: string): Promise<string[]>;
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
