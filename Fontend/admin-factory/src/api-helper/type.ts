export interface IConfiguration {
    machineName1: string;
    machineName2: string;
    machineName3: string;
    note: string;
    tray: string;
    orderId: number;
}

export interface IHistory{
    userId: string;
    masterFileName: string;
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

export interface ICompareResponse {
    machineName: string;
    trayName: string;
    status: boolean;
}