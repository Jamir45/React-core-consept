import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';


const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const auth = useAuth()

    const onSubmit = data => {
      const savedCartProduct = getDatabaseCart()
      const orderedProduct = savedCartProduct;
      const orderTime = new Date();
      const orderPlace = {...data, orderedProduct, orderTime}
      fetch('http://localhost:4000/orderedData', {
                method:'POST',
                body:JSON.stringify(orderPlace),
                headers: {"content-type": "application/json; charset=UTF-8"}
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            });
      processOrder()
      console.log(data)
      window.location.pathname = '/' 
    }
    


    return (
      <form  className="form" onSubmit={handleSubmit(onSubmit)}>        
        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder='Your Name'/>
        {errors.name && <span className='error'>Name field is required</span>}

        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder='Your Email'/>
        {errors.email && <span className='error'>Email field is required</span>}

        <input name="address" ref={register({ required: true })} placeholder='Your Address'/>
        {errors.address && <span className='error'>Address field is required</span>}

        <input name="city" ref={register({ required: true })} placeholder='Your City'/>
        {errors.city && <span className='error'>City field is required</span>}

        <input name="country" ref={register({ required: true })} placeholder='Your Country'/>
        {errors.country && <span className='error'>Country field is required</span>}

        <input name="zipcode" ref={register({ required: true })} placeholder='Zipcode'/>
        {errors.zipcode && <span className='error'>Zipcode field is required</span>}
        
        <input type="submit" />
      </form>
    )
};

export default Shipment;