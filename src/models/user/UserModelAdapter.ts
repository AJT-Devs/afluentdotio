import { User } from "../../entities/User";

export interface UserModelAdapter {
    createUser(user: User): Promise<Partial<User>>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<User>;
    getAllUsers(): Promise<Partial<User>[]>;
    getUserById(id: string): Promise<Partial<User> | null>;
    getAiKey(id: string): Promise<string | null>;
}