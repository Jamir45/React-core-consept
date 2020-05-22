import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css'
import ProductInfo from './ProductInfo';

const ProductDetails = () => {
    

    const [data, setData] = useState();
    useEffect( () => {
        fetch('http://localhost:4000/product/' + key)
        .then( response => response.json())
        .then( data => {
            setData(data)   
        })
    }, [])
    console.log(data)
    
    const {key} = useParams();
    // const product = fakeData.find( (selectedProduct) => selectedProduct.key === key);
    // console.log(product)
    
    return (
        <div>
            <div id='formate'>
                {
                    data && <ProductInfo showButton={false} showLink={false} productData={data}></ProductInfo>
                }
            </div>
        </div>
    );
};

export default ProductDetails;