import MongooseSingleton from '../MongooseSingleton'
import { User } from '../../entities/User'
import { UserModelAdapter } from './UserModelAdapter'
import { UserModelDb, IUserDoc } from '../../../mongoose/UserMongooseSchema'

export default class MongooseUserModel implements UserModelAdapter {
  private toEntity(doc: IUserDoc): User {
    // Convert Mongoose document to User entity
    return doc.toObject() as unknown as User
  }

  public async createUser(user: User): Promise<User> {
    await MongooseSingleton.getInstance()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...userData } = user

    const createdUserDoc = await UserModelDb.create(userData)
    return this.toEntity(createdUserDoc)
  }

  public async updateUser(user: User): Promise<User> {
    await MongooseSingleton.getInstance()

    const updatedUserDoc = await UserModelDb.findByIdAndUpdate(user.id, { ...user }, { new: true })

    if (!updatedUserDoc) throw new Error('Usuário não encontrado.')

    return this.toEntity(updatedUserDoc)
  }

  public async deleteUser(id: string): Promise<User> {
    await MongooseSingleton.getInstance()

    const deletedDoc = await UserModelDb.findByIdAndDelete(id)
    if (!deletedDoc) throw new Error('Usuário não encontrado.')
    return this.toEntity(deletedDoc)
  }

  public async getAllUsers(): Promise<Partial<User>[]> {
    await MongooseSingleton.getInstance()

    const userDocs = await UserModelDb.find().exec()
    return userDocs.map((doc) => this.toEntity(doc))
  }

  public async getUserById(id: string): Promise<Partial<User> | null> {
    await MongooseSingleton.getInstance()

    const userDoc = await UserModelDb.findById(id, 'id name photo preferenceaimodel').exec()
    return userDoc ? this.toEntity(userDoc) : null
  }

  public async getAiKey(id: string): Promise<string | null> {
    await MongooseSingleton.getInstance()

    const userDoc = await UserModelDb.findById(id, 'aikey').exec()
    return userDoc ? userDoc.aikey : null
  }
}
