import React from 'react'
import CardBusines from './CardBusines'
const ListBusiness = ({business}) => (
    <div> 
          {business.map(card => {
            return (
              <CardBusines
                key={card.id}
                busines={card}
              />
            );
          })}
        </div>
     
    )
    

export default ListBusiness