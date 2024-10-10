export interface IConfiguration {

}

export interface IHistory{
    machineName: string;
    tray: string;
    result: boolean;
    createdDate: Date;
}

export interface Response<T> {
    isSuccess: boolean;
    message: string;
    result: T;
}

export interface BaseResponse {
    isSuccess: boolean;
    message: string;
}