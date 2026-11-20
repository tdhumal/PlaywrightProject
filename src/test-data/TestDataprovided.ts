import * as path from 'path';
import * as fs from "fs";


export class TestDataProvider{

    static getJsonData(fileName:string){

        const filePath=path.resolve(process.cwd(),'src','test-data',fileName);

        if (!fs.existsSync(filePath)){
            throw new Error('Json not found:${filePath}')

        }
        const rawData=fs.readFileSync(filePath,'utf-8');

        try{
            return JSON.parse(rawData);
        }catch{
            throw new Error ('Invalid json file : ${filePath}');
        }

    }
}