import { useContext } from "react";
import { AdminContext } from "../../contexts/admin-context";

export const Home = () => {
    const context = useContext(AdminContext);
    context.setCurrentPage!('Home');
    return <>home page</>
}