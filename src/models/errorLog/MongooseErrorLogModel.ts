import MongooseSingleton from "../MongooseSingleton";
import { ErrorLogModelAdapter } from "./ErrorLogModelAdapter";
import { ErrorLog } from "../../entities/ErrorLog";

// export class MongooseErrorLogModel implements ErrorLogModelAdapter {
//     private mongoose: poe o type = MongooseSingleton.getInstance();

//     public async createErrorLog(errorLog: ErrorLog): Promise<ErrorLog>{

//     }
//     public async updateErrorLog(errorLog: ErrorLog): Promise<ErrorLog>{

//     }
//     public async deleteErrorLog(id: string): Promise<ErrorLog>{

//     }
//     public async getErrorLogById(id: string): Promise<ErrorLog | null>{

//     }
//     public async getAllErrorLogs(): Promise<ErrorLog[]>{

//     }
// }