import { User } from "../../entities/User";
import { SuccessResponse } from "../../entities/SuccessResponse";

export default interface UserIpcAdapter {
    postUser(user: Partial<User> | User): Promise<SuccessResponse<Partial<User>> | Error> ;
    updateUser(user: Partial<User> | User): Promise<SuccessResponse<Partial<User>> | Error> ;
    deleteUser(id: string): Promise<SuccessResponse<Partial<User>> | Error> ;
    getUserById(id: string): Promise<SuccessResponse<Partial<User>> | Error> ;
    getAllUsers(): Promise<SuccessResponse<Partial<User>[]> | Error> ;
    getAiKey(id: string): Promise<SuccessResponse<Partial<User>> | Error> ;
    getPreferenceAiModel(id: string): Promise<SuccessResponse<Partial<User>> | Error> ;
}