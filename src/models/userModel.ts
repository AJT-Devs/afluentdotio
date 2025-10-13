import { PrismaClient } from "@prisma/client";
import { User } from "../entities/User";

const prisma = new PrismaClient();

export async function createUser(user: User){
    const result = await prisma.user.create({
        data: {
            name: user.name,
            photo: user.photo
        },
        select: {
            id: true,
            name: true,
            photo: true
        }
    })
    return result
}

