import { PrismaClient } from "@prisma/client";
import { User } from "../entities/user";

const prisma = new PrismaClient();

export async function createUser(user: User){
    const result = await prisma.user.create({
        data: user,
        select: {
            id: true,
            name: true,
            photo: true
        }
    })
    return result
}