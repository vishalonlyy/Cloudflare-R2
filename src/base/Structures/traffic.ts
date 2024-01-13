import R2 from "./client.js";
import { Utils} from "../../functions/f.js"
type B_data = {
    bucketName: string;
}
class traffic {

    public data : B_data | never;
    private static _instance: traffic | null = null;

    constructor(data:B_data = {} as B_data) {
        if (traffic._instance) {
            return traffic._instance; // Return existing instance if available
          }
        traffic._instance = this;
        this.data = {...data};
        this.data.bucketName = null;
    }
    public bucketName(name : string){
        this.data.bucketName = name;
        return this;
    }
    public async upload(data : any | any[]){
        if(!this.data.bucketName) throw new Error("Bucket name not set use .bucket() to set bucket name");
        await Utils.FUpload(data,this.getbucketName)
       return this; 
        
    }
//Left here


    get getbucketName(){
        return this.data.bucketName;
    }
}


export { traffic };