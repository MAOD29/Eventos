import React from "react";
import Destino from "../Components/pages/Destino"

const Portada = () => (
  <>
    <div className="bg-navbar-image"></div>
    <div className=" container portada-description">

      <div className="container ">
        <h1 className="title" >Conoce Ixtapa Zihuatanejo</h1>

        <div className="container section">
          <p className="parrafo">
            Es un atractivo pueblo de pescadores que te ofrece un ambiente familiar y seguro, cuya principal atracción es su hermosa y protegida bahía, a unos cuantos kilómetros de la zona hotelera.
      </p>

          <p className="parrafo"> Puedes disfrutar de las claras y pacíficas aguas de la bahía.</p>
          <p> Ixtapa es un lugar rodeado de una cadena montañosa que desciende para encontrarse con el mar y enmarca este maravilloso pueblo. Aquí disfrutarás de su tradicional atmósfera y pacífico ambiente que te ofrecen varias playas para relajarte, o bien encontrar actividades que van desde la pesca deportiva hasta la observación de aves para luego degustar un pescado que no puede ser más fresco.</p>
        </div>

      </div>
      <div className="container section">
        <h1 className="title">Conoce tu proximo destino</h1>
        <Destino />
      </div>
    </div>
  </>
);

export default Portada;
