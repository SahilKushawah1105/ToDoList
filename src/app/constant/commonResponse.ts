// common_response.ts
interface ResponseData {
    [key: string]: any;
}

interface CommonResponse {
    statusCode: number;
    data: ResponseData;
    message: string;
}

export function commonSuccess(data: any, message: string, code: number = 200): CommonResponse {
    return {
        statusCode: code,
        data: data,
        message: message,
    };
}

export function commonError(data: ResponseData = {}, message: string = "Something went wrong!", code: number = 400): CommonResponse {
    return {
        statusCode: code,
        data: data,
        message: message,
    };
}

export function commonNotFound(data: ResponseData = {}, message: string, code: number = 404): CommonResponse {
    return {
        statusCode: code,
        data: data,
        message: message,
    };
}
