import React from "react";

const CardDestino = (props) => {
  const {name, description,image,location} = props
  return(
    <div className="jumbotron">
    <h1 className="display-4">{name}</h1>
    <img src={image} alt={name}/>
    <hr className="my-4" />
    <p className="lead">
        {description}
    </p>
    <small>{location}</small>
    </div>
  )
 
};

export default CardDestino;
