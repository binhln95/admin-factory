import { formatData } from "../utility/utility";
import { BaseResponse, IConfiguration, IHistory, Response } from "./type";

const url = "http://localhost:5180/"

export const getConfiguration = async () => {
    const response = await fetch(url + 'api/Admin/GetConfiguration')
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: Response<IConfiguration> = await response.json();
    return data.result;
}

export const getHistory = async (machineName?: string, trayName?: string, status?: boolean, startDate?: Date, endDate?: Date) => {
    const param = new URLSearchParams();
    machineName && param.append('MachineName', machineName);
    trayName && param.append('TrayName', trayName);
    status && param.append('Result', status.toString());
    startDate && param.append('StartDate', formatData(startDate));
    endDate && param.append('EndDate', formatData(endDate));
    const response = await fetch(url + 'api/Admin/GetHistory?' + param.toString())
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: Response<IHistory[]> = await response.json();
    return data.result;
}

export const UploadConfigFile = async (formData: FormData) => {
    const response = await fetch(url + 'api/Admin/UploadFile', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: BaseResponse = await response.json();
    return data.isSuccess;
}