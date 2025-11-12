import { ErrorLog } from "../../entities/ErrorLog";

export interface ErrorLogModelAdapter {
    createErrorLog(errorLog: ErrorLog): Promise<ErrorLog>;
    updateErrorLog(errorLog: ErrorLog): Promise<ErrorLog>;
    deleteErrorLog(id: string): Promise<ErrorLog>;
    getErrorLogById(id: string): Promise<ErrorLog | null>;
    getAllErrorLogs(): Promise<ErrorLog[]>;
}