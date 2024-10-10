import { createContext, useState } from 'react';

export const AdminContext = createContext<IAdminContext>({});

interface IAdminContext {
    currentPage?: ICurrentPage;
    setCurrentPage?: React.Dispatch<React.SetStateAction<ICurrentPage | undefined>>
}

type ICurrentPage = 'Home' | 'ReadData' | 'History' | 'UploadConfig'

export const initializeContext = () => {
    const [currentPage, setCurrentPage] = useState<ICurrentPage>();
    const response: IAdminContext = {
        currentPage: currentPage,
        setCurrentPage: setCurrentPage
    }
    return response;
}