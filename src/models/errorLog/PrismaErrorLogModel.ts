import PrismaSingleton from "../PrismaSingleton";
import { ErrorLog } from "../../entities/ErrorLog"
import { ErrorLogModelAdapter } from "./ErrorLogModelAdapter";

export class PrismaErrorLogModel implements ErrorLogModelAdapter {
    private prisma = PrismaSingleton.getInstance();

    public async createErrorLog(errorLog: ErrorLog): Promise<ErrorLog> {
        const response = await this.prisma.errorLog.create({
            data: {
                message: errorLog.message
            }
        });
        return response;
    }

    public async updateErrorLog(errorLog: ErrorLog): Promise<ErrorLog> {
        const response = await this.prisma.errorLog.update({
            where: {
                id: errorLog.id
            },
            data: {
                message: errorLog.message
            }
        });
        return response;
    }

    public async deleteErrorLog(id: string): Promise<ErrorLog> {
        const response = await this.prisma.errorLog.delete({
            where: {
                id: id
            }
        });
        return response;
    }

    public async getErrorLogById(id: string): Promise<ErrorLog | null> {
        const response = await this.prisma.errorLog.findUnique({
            where: {
                id: id
            }
        });
        return response;
    }

    public async getAllErrorLogs(): Promise<ErrorLog[]> {
        const response = await this.prisma.errorLog.findMany();
        return response;
    }
}