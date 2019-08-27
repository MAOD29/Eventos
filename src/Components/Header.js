import React from 'react'
import {Link} from 'react-router-dom'


const Header = () =>(
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to='/'>
          <span className="navbar-brand">Ixtapa Zihuatanejo</span>
        </Link>
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to='/Event'>
          <span className="nav-link">Eventos</span>
        </Link>
      </li>
      <Link to='/Destinos'>
          <span className="nav-link">Destinos</span>
        </Link>
        <Link to='/Comercios'>
          <span className="nav-link">Comercios</span>
        </Link>
    </ul>
    <form className="form-inline my-2 my-lg-0">
        <Link to='/Login'>
          <span className="btn btn-outline-success my-2 my-sm-0">Login</span>
        </Link>
    </form>
  </div>
</nav>

  
    
)



export default Header
