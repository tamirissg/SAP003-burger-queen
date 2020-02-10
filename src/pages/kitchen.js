
import React, { useEffect, useState } from 'react';
import firebase from '../utils/firebase';
import '../pages/kitchen.css'
import Nav from '../componentes/nav';




const Request = () => {
    const [order, setOrder] = useState([]);


    useEffect(() => {
        const ordernar = [];
        firebase.firestore().collection('client').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                ordernar.push({
                    id: doc.id,
                    ...doc.data()
                })
            }
            )
            setOrder(ordernar)
        })
    }, [])


    return (
        <>
        <Nav/>
        
            <div>
                {order.map(doc =>
                    <div className="cards">
                        <p>Cliente: {doc.client}</p>
                        <p>Mesa: {doc.table}</p>
                        <p>Pedido:</p>
                        {doc.order.map(item =>
                        <>
                        <p>{item.name}</p>
                        <p> Preço: R$  {item.price}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Request 
    