import React from 'react';
import './Review.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewDetails from './ReviewDetails/ReviewDetails';
import { Link } from 'react-router-dom';

const Review = () => {
    const [data, setData ] = useState([])
    useEffect( () => {
        fetch('http://localhost:4000/allProduct')
        .then( response => response.json())
        .then( data => {
            setData(data)
            console.log(data)
        })
    }, [])
    console.log(data)

    const [cart, setCart] = useState([])

    useEffect( () => {
        const product = getDatabaseCart()
        const key = Object.keys(product)
        if (data.length) {
            const cartProduct = key.map( newkey => {
                const newProduct = data.find( product => product.key === newkey)
                newProduct.quantity = product[newkey];
                return newProduct
            })
            setCart(cartProduct)
        }
    }, [data])

    const removeHandler = ( (removeProduct) => {
        console.log('product clicked', removeProduct.key)
        const remove = cart.filter( product => product.key !== removeProduct.key)
        setCart(remove)
        removeFromDatabaseCart(removeProduct.key)
    })


    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        const totalAmount = element.price * element.quantity
        total = total + totalAmount;
    }

    let shipping = 0;
    if (total > 0 && total<500) {
        shipping = 5;
    }
    else if (total > 501 && total<1000) {
        shipping = 12;
    }
    else if (total > 1001 && total<1500) {
        shipping = 25;
    }
    else{
        shipping = 0;
    }
    const vat = (total*2)/100
    const totalAmount = (total+shipping+vat);

    const placeOrderHandler = () => {
        setCart([])
        processOrder()
    }

    return (
        <div className='container d-flex'>
            <div className='col-md-3'>
                <h1>This is cart</h1>
                <h5>Items Ordered : {(cart.length)}</h5>
                <p>Product Amount : {(total.toFixed(2))}</p>
                <p>Shipping Charge : {shipping}</p>
                <p>Text & Vat : {vat.toFixed(2)}</p>
                <p><b>Total Amount : {totalAmount.toFixed(2)}</b></p>
                <Link to='/shipment'><button className="btn btn-success">Proceed Checkout</button></Link>
            </div>
            
            <div className='col-md-9 border'>
                {
                    cart.map( product => <ReviewDetails 
                        removeHandler={removeHandler}
                        cartProduct={product}>
                        </ReviewDetails>)
                }
                {
                    !cart.length && <h1>Your cart is empty. Please <Link to='/'> Add </Link> some product</h1>
                }
            </div>
        </div>
    );
};

export default Review;