import React from "react";
import ImageZihua from '../images/zihuatanejo.jpg'
import {Link} from 'react-router-dom'
const Portada = () => (
  <div className="jumbotron">
    <h1 className="display-4">Conoce Ixtapa Zihuatanejo</h1>
    <img src={ImageZihua} alt="foto de zihuatanejo"/>
    <hr className="my-4" />
    <p className="lead">
    Zihuatanejo - Ixtapa, Troncones y Barra de Potosí son destinos cercanos localizados en el Estado de Guerrero, México en la costa del Pacífico en la zona conocida como la Riviera Mexicana o "Costa Grande".a los dos destinos se llega por el mismo Aeropuerto Internacional, situado a fácil acceso en coche, taxi o autobús. Estos destinos hermanos únicamente comparten servicios para dar al visitante dos destinos por el precio de uno.
    </p>
    
    <Link to='/Event'>
          <span className="btn btn-primary btn-lg">Checa nuestros eventos</span>
      </Link>
  </div>
);

export default Portada;
