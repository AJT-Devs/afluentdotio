import { UserModelAdapter } from "./UserModelAdapter";
import {User} from '../../entities/User'
import path from "path";
import Datastore from '@seald-io/nedb'
import { dirname } from "path";

export default class NeDBUserModel{
    __dirname = dirname('');
    private dbPath = path.join(this.__dirname, '/database/meu-banco.db');
    private db = new Datastore({ filename: this.dbPath, autoload: true });
    
    public async createUser(user: User | Partial<User>): Promise<void>{
        const result = await this.db.insertAsync({user, _id: '1'});
        console.log(result);
    }
}