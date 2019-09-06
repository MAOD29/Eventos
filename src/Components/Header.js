import React from "react";
import { NavLink} from "react-router-dom";

const Header = () => {
  const isLoging = () => {
    const user = localStorage.getItem("myData");
    return user ? true : false;
  };
  const NavCliente = () => (
    <>
      <NavLink to={"/mis-comercios"}>
        <span className="nav-link">Mis Comercios</span>
      </NavLink>
    
        <NavLink to={"/mis-eventos"}>
          <span className="nav-link">Mis Eventos</span>
        </NavLink>
     
    </>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/">
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
            <NavLink to="/Event"  >
              <span className="nav-link">Eventos</span>
            </NavLink>
          </li>
          <NavLink to="/Destinos">
            <span className="nav-link">Destinos</span>
          </NavLink>
          <NavLink to="/Comercios">
            <span className="nav-link">Comercios</span>
          </NavLink>
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
