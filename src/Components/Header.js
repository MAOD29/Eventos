import React from "react";
import { NavLink } from "react-router-dom";

import "../css/header.css"

const Header = () => {
  const isLoging = () => {
    const user = localStorage.getItem("myData");
    return user ? true : false;
  };
  const NavCliente = () => (
    <>
      <NavLink to={"/mis-comercios"} activeClassName="activo">
        <span className="nav-link">Gestion de comercios</span>
      </NavLink>

      <NavLink to={"/mis-eventos"} activeClassName="activo">
        <span className="nav-link">Gestion de eventos</span>
      </NavLink>
      <NavLink to={"/gestion-destino"} activeClassName="activo">
        <span className="nav-link">Gestion de destino</span>
      </NavLink>

    </>
  );
  return (
    
      <nav className="navbar navbar-expand-md navbar-light bg-light  fixed-top ">
        <NavLink to="/" activeClassName="activo">
          <span className="navbar-brand">Ixtapa Zihuatanejo</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink to="/Event" activeClassName="activo">
                <span className="nav-link">Eventos</span>
              </NavLink>
            </li>
            <li className="nav-item">
          
            </li>
            <li className="nav-item">
            <NavLink to="/Comercios" activeClassName="activo">
              <span className="nav-link">Comercios</span>
            </NavLink>
            </li>
          </ul>

          <ul className="form-inline my-2 my-lg-0">
            {isLoging() ? <NavCliente /> : ""}

            <NavLink to={isLoging() ? "/Logout" : "/Login"}>
              <span className="btn btn-outline-success my-2 my-sm-0">
                {isLoging() ? "Logout" : "Login"}
              </span>
            </NavLink>
          </ul>
        </div>
      </nav>
     
   


  );
};

export default Header;
