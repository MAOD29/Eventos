import React from 'react'


const CardBusines = (props) => {
    const {name,descripcion,image,location,contact,start,finish,type} = props.busines
    return(
        <div className="card mb-3">
        <img src={image} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{descripcion}</p>
            <p className="card-text">{location}</p>
            <p className="card-text">{contact}</p>    
            <p className="card-text">{type}</p>    

            <p className="card-text">
                <small className="text-muted">{start} </small>
                <small className="text-muted">{finish} </small>
            </p>
            </div>
        </div>
    )
}



export default CardBusines