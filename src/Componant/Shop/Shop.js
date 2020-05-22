import React, { useEffect } from 'react';
import { useState } from 'react';
import Product from './Product/Product';
import Cart from './Cart/Cart';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart,  } from '../../utilities/databaseManager';

const Shop = () => {
    const [data, setData ] = useState([])
    const [cart, setCart] = useState([0]);

    useEffect( () => {
        fetch('http://localhost:4000/allProduct')
        .then( response => response.json())
        .then( data => {
            setData(data)
        })
    }, [])
    console.log(data)

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

    const cartHandler = (selectedProduct) => {
        const totalSelectedProduct = [...cart, selectedProduct]
        setCart(totalSelectedProduct);

        // এখানে আমরা Product এর quantity add করার জন্য আমরা প্রথমে cart এর সব গুলো Product কে এর key এর সাহায্যে পুনরায় filter করে সব গুলো product কে আমাদের ডাটাবেজ বা Local storage এ add করেছি ।
        const storeProduct = totalSelectedProduct.filter( product => product.key === selectedProduct.key);
        const quantity = storeProduct.length;
        addToDatabaseCart(selectedProduct.key, quantity)
    }

    return (
        <div className='shop-container container'>
            <div className="row">
                <div className='productContainer col-md-9'>
                    {
                        data.map( data => <Product 
                        showButton = {true}
                        showLink={true}
                        key = {data.key}
                        productData={data} 
                        cartHandler={cartHandler}>
                        </Product>)
                    }
                </div>
                <div className='col-md-3'>
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;