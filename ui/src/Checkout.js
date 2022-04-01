import React from 'react'
import { useStateValue } from './StateProvider'
import banner from './images/banner.jpg'
import "./Checkout.css"
import CheckoutProduct from "./CheckoutProduct"
import Subtotal from "./Subtotal"

function Checkout() {

    const [{basket}] = useStateValue()

    return (
        <div className="checkout">
            <div className="checkoutLeft">
                {basket?.length === 0 ? (
                    <div>
                        <h2>Your shopping basket is empty</h2>
                        <p>You have no item in your basket. Browse through our diverse categories of products, to get started.</p>
                    </div>
                ) : (
                    <div>
        
                        {basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                )}
            </div>

            {basket.length > 0 && (
                <div className="checkoutRight">
                    <Subtotal />
                </div>
            )}
        </div>
    )
}

export default Checkout
