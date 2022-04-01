import React, { useEffect, useState } from 'react'
import './Header.css'
import logo from './images/logo.png'
import {Link} from "react-router-dom"
import SearchIcon from "@material-ui/icons/Search"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import {useStateValue} from "./StateProvider"
import Web3 from 'web3'

function Header() {
    const [{basket}] = useStateValue();
    const [address, setAddress] = useState('')

    // load provider
    useEffect(() => {

        const loadProvider = async() => {
            if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
                try{
                    const web3 = new Web3(window.ethereum)

                    // get account address
                    const accounts = await web3.eth.getAccounts()
                    setAddress(accounts[0])

                    window.ethereum.on("accountsChanged", accounts => window.location.reload())
                    window.ethereum.on("chainChanged", accounts => window.location.reload())

                }
                catch(err){
                    alert(err.message)
                }
            }
            else{
                alert("Please Install Metamask")
            }
        }

        loadProvider();
    }, [])

    const connectHandler = async() => {
        try{
            await window.ethereum.request({method: "eth_requestAccounts"})
            window.location.reload()
        }
        catch(err){
            alert(err.message)
        }
    }

    return (
        <nav className="header">
            {/* logo */}
            <Link to="/">
                <img className="header__logo" src={logo} alt="" />
            </Link>

            {/* search bar */}
            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>

            {/* navigations */}
            <div className="header__nav">
                <Link to="/create-products" className="header__link">
                    <div className="header__option">
                        <span className="header__optionOne">Add</span>
                        <span className="header__optionTwo">Products</span>
                    </div>
                </Link>

                {/* cart */}
                <Link to="/checkout" className="header__link">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>

                <button onClick={connectHandler}>
                    {
                        address ?
                        (
                            <div>
                                {address.slice(0, 3)}...{address.slice(38)}
                            </div>
                        ) :
                        (
                            "Connect"
                        )
                    }
                </button>
            </div>
        </nav>
    )
}

export default Header
