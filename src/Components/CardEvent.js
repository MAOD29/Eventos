import React from 'react'



const Event = (props) => {
 
    const {title,descripcion,location,image,date,start,finish,web_site} = props
    return (
        <div className="card mb-3">
        <img src={image} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{descripcion}</p>
            <p className="card-text">{location}</p>
            <p className="card-text">
                <small className="text-muted">{date} </small>
                <small className="text-muted">{start} </small>
                <small className="text-muted">{finish} </small>
                <small className="text-muted">{web_site}</small>
            </p>
            </div>
        </div>
    )
}


export default Event