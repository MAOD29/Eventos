import React from "react";

const CardDestino = (props) => {
  const { name, description, image, location } = props
  return (

    <div className="col-lg-4 col-md-6">
      <div className="card mb-3" width="18rem">
        <img src={image} className="card-img-top" alt={image} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">{location}</p>
        </div>
      </div>
    </div>
  )

};

export default CardDestino;
