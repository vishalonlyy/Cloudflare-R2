import R2 from "../base/Structures/client";
export declare class Utils {
    private static xInstance;
    static getXInstance(): R2;
    static getExc(data: any): Promise<any>;
    static getType(extension: string): any;
    static FUpload(data: any | any[], Bn: string): Promise<void>;
    static System_U(BN: string, FN: string, D: any, FT: string): Promise<boolean>;
    /** */
    static StringGenerator(length: any): Promise<string>;
    static RadmonSelection(): Promise<number>;
}
