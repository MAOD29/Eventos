import React from 'react'
import CardEvent from '../Components/CardEvent'

const ListEvent = ({events}) => (
<div className="card-group"> 
      {events.map(card => {
        return (
          <CardEvent
            key={card.id}
            event={card}
          />

        );
      })}
    </div>

)



export default ListEvent