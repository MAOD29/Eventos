import React from 'react'
import CardEvent from '../CardEvent'

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