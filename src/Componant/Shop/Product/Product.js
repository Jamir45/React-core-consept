import React from 'react';
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, seller, stock, img, price, key} = props.productData
    return (
        <div className="d-flex Border">
            <div className="productImg">
                <img src={img} alt=""/>
            </div>
            <div className="productDetails">
                {/* Dynamic Parameter */}
                <h5>Product Name : <Link to={'/product/'+key}>{name}</Link></h5>
                <p><b> Seller : </b>{seller}</p>
                <p>Left in stock : {stock}</p>
                <p><b> Price : </b>{price}</p>
                { props.showButton && <button id='showAddtoCart' className="btn btn-success" onClick={ () => props.cartHandler(props.productData)}>Add to Cart</button>}
            </div>
        </div>
    );
};

export default Product;