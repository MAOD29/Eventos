import React from 'react'
import CardEvent from '../Components/CardEvent'

const ListEvent = ({events}) => (
<div> 
      {events.map(card => {
        return (
          <CardEvent
            key={card.id}
            title={card.title}
            description={card.descripcion}
            img={card.img}
            location={card.location}
            date={card.date}
            start={card.start}
            finish={card.finish}
          />
        );
      })}
    </div>

)



export default ListEvent