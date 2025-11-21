import MongooseSingleton from '../MongooseSingleton'
import { ErrorLogModelAdapter } from './ErrorLogModelAdapter'
import { ErrorLog } from '../../entities/ErrorLog'
import { ErrorLogModelDB, IErrorLogDoc } from '../../../mongoose/ErrorLogMongooseSchema'

export default class MongooseErrorLogModel implements ErrorLogModelAdapter {
  private toEntity(doc: IErrorLogDoc): ErrorLog {
    return doc.toObject() as unknown as ErrorLog;
  }

  public async createErrorLog(errorLog: ErrorLog): Promise<ErrorLog> {
    const { id, date, ...errorLogData } = errorLog;
    await MongooseSingleton.getInstance();
    const createdErrorLogDoc = await ErrorLogModelDB.create(errorLogData);
    return this.toEntity(createdErrorLogDoc);
  }

  public async updateErrorLog(errorLog: ErrorLog): Promise<ErrorLog | null> {
    await MongooseSingleton.getInstance();

    const updatedErrorLogDoc = await ErrorLogModelDB.findByIdAndUpdate(
      errorLog.id,
      { ...errorLog },
      { new: true }
    ).exec();
    if (!updatedErrorLogDoc) {
      return null;
    }

    return this.toEntity(updatedErrorLogDoc);
  }

  public async deleteErrorLog(id: string): Promise<ErrorLog | null> {
    await MongooseSingleton.getInstance();

    const deletedErrorLogDoc = await ErrorLogModelDB.findByIdAndDelete(id).exec();
    if (!deletedErrorLogDoc){
      return null;
    }

    return this.toEntity(deletedErrorLogDoc);
  }

  public async getErrorLogById(id: string): Promise<ErrorLog | null> {
    await MongooseSingleton.getInstance();

    const errorLogDoc = await ErrorLogModelDB.findById(id).exec();
    if (!errorLogDoc){
      return null;
    }

    return this.toEntity(errorLogDoc);
  }

  public async getAllErrorLogs(): Promise<ErrorLog[]> {
    await MongooseSingleton.getInstance();

    const errorLogDocs = await ErrorLogModelDB.find().exec();
    return errorLogDocs.map((doc) => this.toEntity(doc));
  }

}