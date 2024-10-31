import { formatData } from "../utility/utility";
import { BaseResponse, ICompareResponse, IConfiguration, IHistory, Response } from "./type";

const url = "http://localhost:12345/"
// const url = "http://172.16.100.5:12345/"

export const getConfiguration = async (masterFileName: string) => {
    const response = await fetch(url + 'api/Admin/GetConfiguration?MasterFileName=' + masterFileName)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: Response<IConfiguration[]> = await response.json();
    return data.result;
}

export const getMasterFile = async () => {
    const response = await fetch(url + 'api/Admin/GetMasterFile')
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: Response<string[]> = await response.json();
    return data.result;
}

export const getHistory = async (machineName?: string, trayName?: string, status?: boolean, startDate?: Date, endDate?: Date) => {
    const param = new URLSearchParams();
    machineName && param.append('MachineName', machineName);
    trayName && param.append('TrayName', trayName);
    status && param.append('Result', status.toString());
    startDate && param.append('StartDate', formatData(startDate));
    endDate && param.append('EndDate', formatData(endDate));
    const response = await fetch(url + 'api/Admin/GetHistory?' + param.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;'
        }
    })
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

export const Compare = async (userNumber: string, masterFile: string, machineName: string, trayName: string) => {
    const response = await fetch(url + 'api/Admin/Compare', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;'
        },
        body: JSON.stringify({
            machineName: machineName,
            trayName: trayName,
            UserId: userNumber,
            MasterFileName: masterFile
        })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Response<boolean> = await response.json();
    const res : ICompareResponse = {
        machineName: machineName,
        trayName: trayName, 
        status: data.result
    }
    return res;
}