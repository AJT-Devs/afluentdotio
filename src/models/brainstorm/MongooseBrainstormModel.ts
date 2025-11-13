import { BrainstormModelAdapter } from './BrainstormModelAdapter';
import { Brainstorm } from '../../entities/Brainstorm';
import MongooseSingleton from '../MongooseSingleton';

// export class MongooseBrainstormModel implements BrainstormModelAdapter {
//     private mongoose: poe o type = MongooseSingleton.getInstance();

//     public async createBrainstorm(brainstorm: Brainstorm): Promise<Partial<Brainstorm>>{

//     }
//     public async updateBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm>{

//     }
//     public async deleteBrainstorm(id: string): Promise<Brainstorm>{

//     }
//     public async getAllBrainstormByUser(userId: string): Promise<Brainstorm[]>{

//     }
//     public async getBrainstormById(id: string): Promise<Brainstorm | null>{

//     }
// }