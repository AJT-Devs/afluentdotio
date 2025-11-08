import { PrismaClient } from "@prisma/client"
import { ErrorLog } from "../entities/errorLog"


const prisma = new PrismaClient()

export class ErrorLogModel {
    public static async createErrorLog(errorLog: ErrorLog): Promise<ErrorLog> {
        const response = await prisma.errorLog.create({
            data: {
                message: errorLog.message
            }
        });
        return response;
    }

    public static async updateErrorLog(errorLog: ErrorLog): Promise<ErrorLog> {
        const response = await prisma.errorLog.update({
            where: {
                id: errorLog.id
            },
            data: {
                message: errorLog.message
            }
        });
        return response;
    }

    public static async deleteErrorLog(id: string): Promise<ErrorLog> {
        const response = await prisma.errorLog.delete({
            where: {
                id: id
            }
        });
        return response;
    }

    public static async getErrorLogById(id: string): Promise<ErrorLog | null> {
        const response = await prisma.errorLog.findUnique({
            where: {
                id: id
            }
        });
        return response;
    }

    public static async getAllErrorLogs(): Promise<ErrorLog[]> {
        const response = await prisma.errorLog.findMany();
        return response;
    }
}