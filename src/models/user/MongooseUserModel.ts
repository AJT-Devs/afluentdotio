import MongooseSingleton from '../MongooseSingleton'
import { User } from '../../entities/User'
import { UserModelAdapter } from './UserModelAdapter'
import { UserModelDb, IUserDoc } from '../../../mongoose/UserMongooseSchema'

export default class MongooseUserModel implements UserModelAdapter {
  private toEntity(doc: IUserDoc): User {
    return {
      id: doc._id.toString(),
      name: doc.name,
      photo: doc.photo ?? null,
      aikey: doc.aikey ?? null,
      preferenceaimodel: doc.preferenceaimodel ?? null
    };
  }

  public async createUser(user: User): Promise<User> {
    const { id, ...userData } = user;
    await MongooseSingleton.getInstance();

    const createdUserDoc = await UserModelDb.create(userData);
    return this.toEntity(createdUserDoc)
  }

  public async updateUser(user: User): Promise<User | null> {
    await MongooseSingleton.getInstance();

    const updatedUserDoc = await UserModelDb.findByIdAndUpdate(
      user.id, { ...user }, { new: true }).exec();

    if (!updatedUserDoc){
      return null;
    }

    return this.toEntity(updatedUserDoc);
  }

  public async deleteUser(id: string): Promise<User | null> {
    await MongooseSingleton.getInstance();

    const deletedDoc = await UserModelDb.findByIdAndDelete(id).exec();
    if (!deletedDoc) {
      return null;
    }
    return this.toEntity(deletedDoc);
  }

  public async getAllUsers(): Promise<Partial<User>[]> {
    await MongooseSingleton.getInstance();

    const userDocs = await UserModelDb.find().exec();
    userDocs.map((doc) => this.toEntity(doc));
    return userDocs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      photo: doc.photo,
      preferenceaimodel: doc.preferenceaimodel
    }));
  }

  public async getUserById(id: string): Promise<Partial<User> | null> {
    await MongooseSingleton.getInstance();

    const userDoc = await UserModelDb.findById(id, 'id name photo preferenceaimodel').exec();

    if (!userDoc) {
      return null;
    }

    const {aikey, ...user} = this.toEntity(userDoc);
    return user;
  }

  public async getAiKey(id: string): Promise<string | null> {
    await MongooseSingleton.getInstance();

    const userDoc = await UserModelDb.findById(id, 'aikey').exec();
    if (!userDoc) {
      return null;
    }
    if (!userDoc.aikey) {
      return null;
    }
    return userDoc.aikey;
  }

  public async getPreferenceAiModel(id: string): Promise<string | null> {
    await MongooseSingleton.getInstance();
    const userDoc = await UserModelDb.findById(id, 'preferenceaimodel').exec();
    if (!userDoc) {
      return null;
    }
    if (!userDoc.preferenceaimodel) {
      return null;
    }
    return userDoc.preferenceaimodel;
  }
}
