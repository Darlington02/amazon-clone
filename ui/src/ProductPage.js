import React from 'react'
import StarRateIcon from "@material-ui/icons/StarRate"
import "./ProductPage.css"
import {useLocation} from "react-router-dom"
import { useStateValue } from './StateProvider'
import logo from "./images/eth-logo.png"

function ProductPage(props) {

    const location = useLocation()
    const id = location.state?.data.id
    const image = location.state?.data.image
    const title = location.state?.data.title
    const price = location.state?.data.price
    const rating = location.state?.data.rating
    const category = location.state?.data.category
    const quantity = location.state?.data.quantity
    const desc = location.state?.data.description

    const [{basket}, dispatch] = useStateValue()

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    }

    return (
        <div>
            <div className="product__page">
                <div className="img__section">
                    <img src={image} alt="" />
                </div>

                <div className="product__info">
                    <div className="product__title">{title}</div>
                    <div className="product__rating">
                        {
                            Array({rating}).fill().map((_) => (
                                <p class="icon"><StarRateIcon /></p>
                            ))
                        } 
                        {rating} ratings
                    </div>
                    <hr />

                    <p className="product__price">
                        Price: <img src={logo} width="15" alt="ethereum logo" />
                        <strong>{price}</strong>
                    </p>
                    <p className="info"><b>Category: </b>{category}</p>
                    <p className="info"><b>Quantity: </b>{quantity}</p>
                    <hr />
                    <div className="product__desc">
                        <p>{desc}</p>
                    </div>
                </div>

                <div className="delivery">
                    <p className="product__price">
                        Price: <img src={logo} width="15" alt="ethereum logo" />
                        <strong>{price}</strong>
                    </p>
                    <div className="delivery__info">
                        <p>FREE delivery April 6 - 11.</p>
                        <p>In Stock</p>
                        <p className="installment">Pay $43.89/month for 18 months, interest-free upon approval for the Amazon Rewards Visa Card</p>
                    </div>
                    <button onClick={addToBasket}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
