import { User } from "../../entities/User";

export interface UserModelAdapter {
    createUser(user: Partial<User> | User): Promise<Partial<User>>;
    updateUser(user: Partial<User> | User): Promise<User | null>;
    deleteUser(id: string): Promise<User | null>;
    getAllUsers(): Promise<Partial<User>[]>;
    getUserById(id: string): Promise<Partial<User> | null>;
    getAiKey(id: string): Promise<string | null>;
    getPreferenceAiModel(id: string): Promise<string | null>;  
}