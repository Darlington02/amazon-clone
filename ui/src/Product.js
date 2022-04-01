import React from 'react'
import {Link} from "react-router-dom"
import "./Product.css"
import StarRateIcon from "@material-ui/icons/StarRate"
import { useStateValue } from './StateProvider'
import logo from './images/eth-logo.png'

function Product({id, title, image, price, rating, category, quantity, description}) {

    // create an object of props
    const props = {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        category: category,
        quantity: quantity,
        description: description
    }
    
    return (
        <Link to="/productPage" state={{data: props}} className="product__link">
            <div className="product">
                <div className="product__info">
                    <p>{title}</p>
                    <p className="product__price">
                        <img src={logo} width="15" alt="ethereum logo" />
                        <strong>{price}</strong>
                    </p>
                    <div className="product__rating">
                        {
                            Array(rating).fill().map((_) => (
                                <p class="icon"><StarRateIcon /></p>
                            ))
                        }
                    </div>
                </div>

                <img src={image} alt={image} />
                {/* <button onClick={addToBasket}>Add to Cart</button> */}
            </div>
        </Link>
    )
}

export default Product
