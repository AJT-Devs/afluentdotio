import { PrismaClient } from "@prisma/client";
import { User } from "../entities/User";

const prisma = new PrismaClient();

export class UserModel {
    static async createUser(user: User): Promise<Partial<User>> {
        const result = await prisma.user.create({
            data: {
                name: user.name,
                photo: user.photo,
                aikey: user.aikey
            },
            select: {
                id: true,
                name: true,
                photo: true
            }
        });
        return result;
    }

    static async updateUser(user: User): Promise<User> {
        const result = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                photo: user.photo,
                aikey: user.aikey
            }
        })
        return result;
    }   

    static async deleteUser(id: string): Promise<User> {
        const result = await prisma.user.delete({
            where: {
                id: id
            }
        });
        return result;
    }

    static async getAllUsers(): Promise<Partial<User>[]> {
        const result = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                photo: true
            }
        });
        return result;
    }
    static async getUserById(id: string): Promise<Partial<User> | null> {
        const result = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                photo: true
            }
        });
        return result;
    }

    static async getAiKey(id: string): Promise<string | null> {
        const result = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                aikey: true
            }
        });
        return result?.aikey || null;

    }
}