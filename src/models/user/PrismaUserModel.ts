import PrismaSingleton from "../PrismaSingleton";
import { User } from "../../entities/User";
import { UserModelAdapter } from "./UserModelAdapter";

export class PrismaUserModel implements UserModelAdapter {
    private prisma = PrismaSingleton.getInstance();
    
    public async createUser(user: User): Promise<Partial<User>> {
        const result = await this.prisma.user.create({
            data: {
                name: user.name,
                photo: user.photo,
                aikey: user.aikey,
                preferenceaimodel: user.preferenceaimodel
            },
            select: {
                id: true,
                name: true,
                photo: true
            }
        });
        return result;
    }

    public async updateUser(user: User): Promise<User> {
        const result = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                photo: user.photo,
                aikey: user.aikey,
                preferenceaimodel: user.preferenceaimodel
            }
        })
        return result;
    }   

    public async deleteUser(id: string): Promise<User> {
        const result = await this.prisma.user.delete({
            where: {
                id: id
            }
        });
        return result;
    }

    public async getAllUsers(): Promise<Partial<User>[]> {
        const result = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                photo: true,
                preferenceaimodel: true
            }
        });
        return result;
    }
    public async getUserById(id: string): Promise<Partial<User> | null> {
        const result = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                photo: true,
                preferenceaimodel: true
            }
        });
        return result;
    }

    public async getAiKey(id: string): Promise<string | null> {
        const result = await this.prisma.user.findUnique({
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