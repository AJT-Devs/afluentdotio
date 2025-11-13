import { User } from "../../entities/User";
import { SuccessResponse } from "../../entities/SuccessResponse";

export default interface UserIpcAdapter {
    postUser(user: User): Promise<SuccessResponse | Error> ;
    updateUser(user: User): Promise<SuccessResponse | Error> ;
    deleteUser(id: string): Promise<SuccessResponse | Error> ;
    getUserById(id: string): Promise<SuccessResponse | Error> ;
    getAllUsers(): Promise<SuccessResponse | Error> ;
    getAiKey(id: string): Promise<SuccessResponse | Error> ;
}