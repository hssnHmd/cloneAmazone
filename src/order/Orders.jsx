import React, { useState, useEffect } from 'react';
import { db} from '../firebase';
import {useStateValue} from '../StateProvider';
import Order from './Order';
import './Orders.css'

function Orders() {
   const [{basket, user},dispatch] = useStateValue();
    const [orders, setorders] = useState([])

    useEffect(() => {
        if(user){
         db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setorders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))   
        }else {
            setorders([]);
        }
        
    }, [user])
    return (
        <div className="orders">
            <h1>Your order</h1>
            <div className="orders_order">
                {
                    orders?.map((order, key) => (
                        <Order order={order} key={key}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
