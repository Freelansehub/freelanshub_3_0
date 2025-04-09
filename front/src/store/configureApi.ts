import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000",
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
};

export type ApiResponse<T> = {
    data: T;
    resultCode: ResultCodeEnum;
    errors: string[] | []
};

export type ResponseErrorType = {
    errors: string[],
    resultCode: ResultCodeEnum
}

export type ResponseSuccessType<T> = {
    data: T
}
