/*
    message: Describing the type of error e.g Not Found error, Unauthorized error
    errorCode: App specific codes to identify different error types
    statusCode: Api status code for the error e.g 404, 400, 405 etc
    errors: more information about the exceptions

*/

export class BaseHttpException extends Error {
    constructor (public message: string, public errorCode: AppErrorCode, public statusCode: number, public errors: any ) {
        super(message)
    }
}


export enum AppErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXIST = 1002,
    INCORRECT_CREDENTIALS = 1003,
    USER_DOES_NOT_EXIST = 1004,
    PERMISSION_DENIED = 2001,
    UNAUTHENTICATED = 3001,
    INVALID_TOKEN = 4001,
    INVALID_OTP = 4002,
    UNPROCESSABLE_ENTITY = 5001,
    NOT_FOUND = 6001,
    INTERNAL_EXCEPTION = 10001,

}

// AppErrorCode.USER_NOT_FOUND