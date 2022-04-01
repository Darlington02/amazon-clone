import React from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider'
import logo from './images/eth-logo.png'

function CheckoutProduct({id, title, image, price}) {

    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {

        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt="" />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>

                <p className="checkoutProduct__price">
                    <img src={logo} width="15" alt="ethereum logo" />
                    <strong>{price}</strong>
                </p>

                <button onClick={removeFromBasket}>Remove from basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
