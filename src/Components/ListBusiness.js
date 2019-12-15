import React from 'react'
import CardBusines from './CardBusines'
//import { BusinesContext } from './providers/BussinesProvider'

const ListBusiness = ({business}) => {

    return (
        <div className="card-group">
            {business.map(card => {
                return (
                    <CardBusines
                        key={card.id}
                        business={card}
                    />

                );
            })}
        </div>
    );


}

export default ListBusiness