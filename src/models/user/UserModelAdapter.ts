import { User } from "../../entities/User";

export interface UserModelAdapter {
    createUser(user: User): Promise<Partial<User>>;
    updateUser(user: User): Promise<User | null>;
    deleteUser(id: string): Promise<User | null>;
    getAllUsers(): Promise<Partial<User>[]>;
    getUserById(id: string): Promise<Partial<User> | null>;
    getAiKey(id: string): Promise<string | null>;
}