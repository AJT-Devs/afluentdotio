import { User } from "../../entities/User";
import { SuccessResponse } from "../../entities/SuccessResponse";

export default interface UserIpcAdapter {
    postUser(user: User): Promise<SuccessResponse<Partial<User>> | Error> ;
    updateUser(user: User): Promise<SuccessResponse<Partial<User>> | Error> ;
    deleteUser(id: string): Promise<SuccessResponse<Partial<User>> | Error> ;
    getUserById(id: string): Promise<SuccessResponse<Partial<User>> | Error> ;
    getAllUsers(): Promise<SuccessResponse<Partial<User>[]> | Error> ;
    getAiKey(id: string): Promise<SuccessResponse<string> | Error> ;
}