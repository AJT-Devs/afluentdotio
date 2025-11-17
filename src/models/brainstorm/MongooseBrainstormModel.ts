import { BrainstormModelAdapter } from './BrainstormModelAdapter'
import { Brainstorm } from '../../entities/Brainstorm'
import MongooseSingleton from '../MongooseSingleton'
import { BrainstormModelDb, IBrainstormDoc } from '../../../mongoose/BrainstormMongooseSchema'

export default class MongooseBrainstormModel implements BrainstormModelAdapter {
  private toEntity(doc: IBrainstormDoc): Brainstorm {
    return doc.toObject() as unknown as Brainstorm
  }

  public async createBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm> {
    await MongooseSingleton.getInstance()
    const createdDoc = await BrainstormModelDb.create(brainstorm)
    return this.toEntity(createdDoc)
  }

  public async updateBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm> {
    await MongooseSingleton.getInstance()
    const updatedDoc = await BrainstormModelDb.findByIdAndUpdate(brainstorm.id, { ...brainstorm }, { new: true })
    if (!updatedDoc) throw new Error('Brainstorm não encontrado.')
    return this.toEntity(updatedDoc)
  }

  public async deleteBrainstorm(id: string): Promise<Brainstorm> {
    await MongooseSingleton.getInstance()
    const deletedDoc = await BrainstormModelDb.findByIdAndDelete(id)
    if (!deletedDoc) throw new Error('Brainstorm não encontrado.')
    return this.toEntity(deletedDoc)
  }

  public async getAllBrainstormByUser(userId: string): Promise<Brainstorm[]> {
    await MongooseSingleton.getInstance()
    const brainstormDocs = await BrainstormModelDb.find({ userId }).exec()
    return brainstormDocs.map((doc) => this.toEntity(doc))
  }

  public async getBrainstormById(id: string): Promise<Brainstorm | null> {
    await MongooseSingleton.getInstance()
    const brainstormDoc = await BrainstormModelDb.findById(id).exec()
    return brainstormDoc ? this.toEntity(brainstormDoc) : null
  }
}
