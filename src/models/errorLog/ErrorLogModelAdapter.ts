import { ErrorLog } from "../../entities/ErrorLog";

export interface ErrorLogModelAdapter {
    createErrorLog(errorLog: ErrorLog): Promise<ErrorLog>;
    updateErrorLog(errorLog: ErrorLog): Promise<ErrorLog | null>;
    deleteErrorLog(id: string): Promise<ErrorLog | null>;
    getErrorLogById(id: string): Promise<ErrorLog | null>;
    getAllErrorLogs(): Promise<ErrorLog[]>;
}