import MongooseSingleton from '../MongooseSingleton'
import { WordModelAdapter } from './WordModelAdapter'
import { Word } from '../../entities/Word'
import { WordModelDb, IWordDoc } from '../../../mongoose/WordMongooseSchema'

export default class MongooseWordModel implements WordModelAdapter {
  private toEntity(doc: IWordDoc): Word {
    return doc.toObject() as unknown as Word
  }

  public async createWord(word: Word): Promise<Word> {
    await MongooseSingleton.getInstance()

    const createdWordDoc = await WordModelDb.create(word)
    return this.toEntity(createdWordDoc)
  }

  public async updateWord(word: Word): Promise<Word> {
    await MongooseSingleton.getInstance()

    const updatedWordDoc = await WordModelDb.findByIdAndUpdate(word.id, { ...word }, { new: true })
    if (!updatedWordDoc) throw new Error('Palavra não encontrada.')

    return this.toEntity(updatedWordDoc)
  }

  public async deleteWord(id: string): Promise<Word> {
    await MongooseSingleton.getInstance()

    const deletedWordDoc = await WordModelDb.findByIdAndDelete(id)
    if (!deletedWordDoc) throw new Error('Palavra não encontrada.')

    return this.toEntity(deletedWordDoc)
  }

  public async getWordById(id: string): Promise<Word | null> {
    await MongooseSingleton.getInstance()

    const wordDoc = await WordModelDb.findById(id)
    if (!wordDoc) return null

    return this.toEntity(wordDoc)
  }

  public async getAllWordByBrainstorm(brainstormId: string): Promise<Word[]> {
    await MongooseSingleton.getInstance()

    const wordDocs = await WordModelDb.find({ brainstormId })
    return wordDocs.map((doc) => this.toEntity(doc))
  }
}
