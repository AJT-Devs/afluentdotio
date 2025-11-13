import MongooseSingleton from "../MongooseSingleton";
import { User } from "../../entities/User";
import { UserModelAdapter } from "./UserModelAdapter";

// export class MongooseUserModel implements UserModelAdapter {
//     private mongoose: poe o type = MongooseSingleton.getInstance();
//     public async createUser(user: User): Promise<Partial<User>>{

//     }
//     public async updateUser(user: User): Promise<User>{

//     }
//     public async deleteUser(id: string): Promise<User>{

//     }
//     public async getAllUsers(): Promise<Partial<User>[]>{

//     }
//     public async getUserById(id: string): Promise<Partial<User> | null>{

//     }
//     public async getAiKey(id: string): Promise<string | null>{

//     }
// }