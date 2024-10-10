import { useContext } from "react";
import { Link } from "react-router-dom"
import { AdminContext } from "../contexts/admin-context";

export const SideBar = () => {
    const context = useContext(AdminContext);
    return (
        <>
            <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title" style={{border: 0}}>
                        <a href="index.html" className="site_title"><i className="fa fa-paw"></i> <span>Admin Factory</span></a>
                    </div>

                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu" >
                        <div className="menu_section active">
                            <br/>
                            <br/>
                            <br/>
                            <h3>    </h3>
                            <ul className="nav side-menu">
                            <li className={context.currentPage == 'Home' ? 'active' : ''}><Link to='/'><i className="fa fa-home"></i>Home</Link></li>
                            <li className={context.currentPage == 'ReadData' ? 'active' : ''}><Link to='/read-data'><i className="fa fa-search"></i>Read data</Link></li>
                            <li className={context.currentPage == 'History' ? 'active' : ''}><Link to='/history'><i className="fa fa-history"></i>History</Link></li>
                            <li className={context.currentPage == 'UploadConfig' ? 'active' : ''}><Link to='/upload-config'><i className="fa fa-cog"></i>Upload config</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}