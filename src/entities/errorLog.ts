export class ErrorLog {
    id
    message
    date
  static IErrorLogDoc: any
    constructor(id: string , message: string, date: Date ) {
        this.id = id
        this.message = message
        this.date = date
    }
}