import React, {useEffect} from 'react';

import './ItemList.css';


const ItemList = ({ allItems }) => {
    return (
        <div className="card-body item-list-container ms-2 me-2">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Flight Number</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Destination</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {allItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.flightNumber}</td>
                            <td>{item.departureTime}</td>
                            <td>{item.arrivalTime}</td>
                            <td>{item.destination}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
};

export default ItemList;