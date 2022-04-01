import React from 'react'
import { useState, useEffect } from 'react';
import './createProducts.css';
import logo from './images/logo.png'
import Web3 from 'web3';
import Contract from './blockchain/Ecommerce';

function CreateProducts() {
    const [web3, setWeb3] = useState('')
    const [account, setAccount] = useState('')
    const [contract, setContract] = useState('')
    const [name, setName] = useState('')
    const [price,setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [quantity, setQuantity] = useState('')
    const [desc, setDesc] = useState('')

    // load provider
    useEffect(() => {
        const loadProvider = async() => {
            if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
                try{
                    const web3 = new Web3(window.ethereum)
                    setWeb3(web3)

                    // create local copy of smart contract
                    const contract = Contract(web3)
                    setContract(contract)

                    // get account address
                    const accounts = await web3.eth.getAccounts()
                    setAccount(accounts[0])
                }
                catch(err){
                    alert(err.message)
                }
            }
            else{
                alert("Please install Metamask");
            }
        }

        loadProvider()
    }, [])

    // add new product on form submit
    const formHandler = (event) => {
        addProduct()
        event.preventDefault()
    }

    // handle the addProduct functionality
    const addProduct = async() => {
        try{
            await contract.methods.createProduct(name, web3.utils.toWei(price, "ether"), category, desc, image, quantity).send({
                from: account,
            })

             alert("Your product was added successfully!")
        }
        catch(err){
            alert(err.message)
        }
    }

    return (
        <div>
            <form className="form" onSubmit={formHandler}>
                <h1>{account ? "Create Product" : "Connect Wallet"}</h1>
                <label for="productName">Product Name</label>
                <input type="text" className="product__name" placeholder="Enter product name" onChange={event => setName(event.target.value)} />

                <label for="productPrice">Product Price</label>
                <input type="number" className="product__price" placeholder="Enter product price" step="any" onChange={event => setPrice(event.target.value)} />

                <label for="productCategory">Product Category</label>
                <select className="selectCategory" value={category} onChange={event => setCategory(event.target.value)}>
                    <option value="Technology">Technology</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Health">Health</option>
                    <option value="Home">Home</option>
                    <option value="Food">Food</option>
                </select>

                <label for="productImage">Product Image(URL)</label>
                <input type="text" className="product__image" placeholder="Enter product image" onChange={event => setImage(event.target.value)} />

                <label for="productQuantity">Product Quantity</label>
                <input type="number" className="product__qty" placeholder="Enter product quantity" onChange={event => setQuantity(event.target.value)} />

                <label for="productDesc">Product Description</label>
                <textArea type="text" className="product__desc" placeholder="Enter product description" onChange={event => setDesc(event.target.value)} />

                {account ?
                    (
                        <button type="submit" className="submitBtn">Submit</button>
                    ):
                    (
                        <button className="submitBtn" disabled>Please Connect to Metamask</button>
                    )
                }
                
            </form>
        </div>
    )
}

export default CreateProducts
