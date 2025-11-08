export class SuccessResponse {
    status
    message
    data

    constructor(status: number, message: string, data: Object) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}