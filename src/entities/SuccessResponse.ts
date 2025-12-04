export class SuccessResponse<T> {
    status
    message
    data

    constructor(status: number, message: string, data: T) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}