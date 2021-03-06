import React from 'react'

const Event = (props) => {
    const {title,descripcion,location,image,date,start,finish,web_site} = props.event
    return (
        <div className="col-lg-4 col-md-6">
        <div className="card mb-3" width="18rem">
        <img src={image} className="card-img-top" alt="imagen de un evento"/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{descripcion}</p>
            <p className="card-text">{location}</p>
            <p className="card-text">{web_site}</p>
            <p className="card-text">
                <small className="text-muted">{date} </small>
                <small className="text-muted">{start} </small>
                <small className="text-muted">{finish} </small>
               
            </p>
            </div>
        </div>
        </div>
    )
}


export default Event