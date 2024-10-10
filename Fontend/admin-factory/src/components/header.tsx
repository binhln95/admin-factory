import { useState } from "react";

export const Header = () => {
    const [show, setShow] = useState(false);
    return (
        <>
        <div className="top_nav">
          <div className="nav_menu">
              <nav className="nav navbar-nav">
              <ul className=" navbar-right">
                <li className="nav-item dropdown open" style={{paddingLeft: 15}}>
                  <a className="user-profile dropdown-toggle" aria-haspopup="true" data-toggle="dropdown" aria-expanded="false"
                  onClick={() => setShow(show => !show)}>
                    Admin
                  </a>
                  <div className={show ? "dropdown-menu dropdown-usermenu pull-right show" : "dropdown-menu dropdown-usermenu pull-right"} aria-labelledby="navbarDropdown">
                    <a className="dropdown-item"  href="login.html"><i className="fa fa-sign-out pull-right"></i> Log Out</a>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        </>
    );
}