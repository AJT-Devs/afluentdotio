import { BrainstormModelAdapter } from './BrainstormModelAdapter'
import { Brainstorm, BrainstormNode, BrainstormEdge, Viewport } from '../../entities/Brainstorm'
import MongooseSingleton from '../MongooseSingleton'
import { BrainstormModelDb, IBrainstormDoc } from '../../../mongoose/BrainstormMongooseSchema'

export default class MongooseBrainstormModel implements BrainstormModelAdapter {
  private toEntity(doc: IBrainstormDoc): Brainstorm {
    const obj = doc.toObject();
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      name: obj.name,
      context: obj.context,
      date: obj.date,
      pool: {
        nodes: obj.pool.nodes.map((node: any) => ({
          ...node,
          id: node._id?.toString()
        })),
        edges: obj.pool.edges.map((edge: any) => ({
          ...edge,
          id: edge._id?.toString()
        })),
        viewport: obj.pool.viewport
      }
    };
  }

  public async createBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm> {
    const { id, date, ...brainstormData } = brainstorm;
    await MongooseSingleton.getInstance();
    const createdDoc = await BrainstormModelDb.create(brainstormData);
    return this.toEntity(createdDoc);
  }

  public async updateBrainstorm(brainstorm: Brainstorm): Promise<Brainstorm | null> {
    await MongooseSingleton.getInstance();
    const updatedDoc = await BrainstormModelDb.findByIdAndUpdate(
      brainstorm.id, { ...brainstorm }, { new: true }).exec();
    if (!updatedDoc) {
      return null;
    }
    return this.toEntity(updatedDoc);
  }

  public async updateViewport(brainstormId: string, viewport: Viewport): Promise<Partial<Brainstorm> | null> {
    await MongooseSingleton.getInstance();
    const updatedDoc = await BrainstormModelDb.findByIdAndUpdate(
      brainstormId,
      { $set: { 'pool.viewport': viewport } },
      { new: true }
    ).exec();
    if (!updatedDoc) {
      return null;
    }
    return this.toEntity(updatedDoc);
  }

  public async updatePoolNode(brainstormId: string, node: BrainstormNode): Promise<Partial<Brainstorm> | null> {
    await MongooseSingleton.getInstance();
    const updatedDoc = await BrainstormModelDb.findOneAndUpdate(
      { _id: brainstormId, 'pool.nodes._id': node.id },
      { $set: { 'pool.nodes.$': node } },
      { new: true }
    ).exec();
    if (!updatedDoc) {
      return null;
    }
    const brainstorm = this.toEntity(updatedDoc);
    return {
      id: brainstorm.id,
      pool: brainstorm.pool
    }
  }

  public async updatePoolEdge(brainstormId: string, edge: BrainstormEdge): Promise<Partial<Brainstorm> | null> {
    await MongooseSingleton.getInstance();
    const updatedDoc = await BrainstormModelDb.findOneAndUpdate(
      { _id: brainstormId, 'pool.edges._id': edge.id },
      { $set: { 'pool.edges.$': edge } },
      { new: true }
    ).exec();
    if (!updatedDoc) {
      return null;
    }
    return this.toEntity(updatedDoc);
  }

  public async deleteBrainstorm(id: string): Promise<Brainstorm | null> {
    await MongooseSingleton.getInstance();
    const deletedDoc = await BrainstormModelDb.findByIdAndDelete(id).exec();
    if (!deletedDoc) {
      return null;
    }
    return this.toEntity(deletedDoc);
  }

  public async deletePoolNode(brainstormId: string, nodeId: string): Promise<Partial<Brainstorm> | null> {
    await MongooseSingleton.getInstance();
    const updatedDoc = await BrainstormModelDb.findByIdAndUpdate(
      brainstormId,
      { $pull: { 'pool.nodes': { _id: nodeId } } },
      { new: true }
    ).exec();
    if (!updatedDoc) {
      return null;
    }
    return this.toEntity(updatedDoc);
  }

  public async deletePoolEdge(brainstormId: string, edgeId: string): Promise<Partial<Brainstorm> | null> {
    await MongooseSingleton.getInstance();
    const updatedDoc = await BrainstormModelDb.findByIdAndUpdate(
      brainstormId,
      { $pull: { 'pool.edges': { _id: edgeId } } },
      { new: true }
    ).exec();
    if (!updatedDoc) {
      return null;
    }
    return this.toEntity(updatedDoc);
  }

  public async getAllBrainstormByUser(userId: string): Promise<Brainstorm[]> {
    await MongooseSingleton.getInstance();
    const brainstormDocs = await BrainstormModelDb.find({ userId }).exec();
    return brainstormDocs.map((doc) => this.toEntity(doc));
  }

  public async getBrainstormById(id: string): Promise<Brainstorm | null> {
    await MongooseSingleton.getInstance();
    const brainstormDoc = await BrainstormModelDb.findById(id).exec();
    return brainstormDoc ? this.toEntity(brainstormDoc) : null;
  }

  public async getBrainstormPoolById(brainstormId: string): Promise<Partial<Brainstorm> | null> {
    await MongooseSingleton.getInstance();
    const brainstormDoc = await BrainstormModelDb.findById(brainstormId).exec();
    if (!brainstormDoc) {
      return null;
    }
    const brainstorm = this.toEntity(brainstormDoc);
    console.log(brainstorm);
    return {
      id: brainstorm.id,
      pool: brainstorm.pool
    };
  }

  public async pushToPoolNodes(brainstormId: string, node: BrainstormNode): Promise<string| null> {
    await MongooseSingleton.getInstance();
    const updatedDoc = await BrainstormModelDb.findByIdAndUpdate(
      brainstormId,
      { $push: { 'pool.nodes': node } },
      { new: true }
    ).exec();
    if (!updatedDoc) {
      return null;
    }
    const brainstorm = this.toEntity(updatedDoc);
    return brainstorm.pool.nodes[brainstorm.pool.nodes.length -1].id ?? null;

  }

  public async pushToPoolEdges(brainstormId: string, edge: BrainstormEdge): Promise<Partial<Brainstorm> | null> {
    await MongooseSingleton.getInstance();
    const updatedDoc = await BrainstormModelDb.findByIdAndUpdate(
      brainstormId,
      { $push: { 'pool.edges': edge } },
      { new: true }
    ).exec();
    if (!updatedDoc) {
      return null;
    }
    return this.toEntity(updatedDoc);
  }

}
