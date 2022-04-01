import React, { useEffect, useState } from 'react'
import Product from './Product'
import "./Home.css"
import Web3 from "web3"
import Contract from "./blockchain/Ecommerce"
import bannerImage from './images/banner.jpg'

function Home() {
    
    const [web3, setWeb3] = useState('')
    const [account, setAccount] = useState('')
    const [contract, setContract] = useState('')
    const [products, setProducts] = useState('')

    useEffect(() => {
        const loadProvider = async() => {
            if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
                try{
                    const web3 = new Web3(window.ethereum)
                    setWeb3(web3)

                    // get accounts
                    const accounts = await web3.eth.getAccounts()
                    setAccount(accounts[0])

                    // load local copy of contract
                    const contract = Contract(web3)
                    setContract(contract)
                }
                catch(err){
                    alert(err.message)
                }
            }
            else{
                alert("Please install Metamask")
            }
        }

        loadProvider()
    }, [])

    useEffect(() => {
        // load products from contract
        const getProducts = async() => {

            let productIdArray = []
            let products = []

            // get the length of the contract's productIds array
            const productArrayLength = await contract.methods.productArrayLength().call()

            try{
                for(let i=0; i<productArrayLength; i++){
                    const productId = await contract.methods.productIds(i).call()
                    productIdArray.push(productId)
                } 

                for(let i=0; i<productIdArray.length; i++){
                    const product = await contract.methods.products(productIdArray[i]).call()
                    products.push(product)
                }
                setProducts(products)
            }
            catch(err){
                alert(err.message)
            }

        }

        contract && getProducts()

    }, [contract])


    return (
        <div className="home">

            <img className="banner__image" src={bannerImage} alt="" width="100%" />

            <div className="home__row">
                {products ? 
                    (
                        products.map(
                        product => 
                            (
                                <Product
                                    id={product.productID}
                                    title={product.productName}
                                    price={web3.utils.fromWei(product.productPrice, "ether")}
                                    rating={4}
                                    image={product.productImage}
                                    category={product.productCategory}
                                    quantity={product.productQuantity}
                                    description={product.productDescription}
                                />
                            )
                        ) 
                    ):
                    "Loading Products from Contract..."
                }

            </div>
           
        </div>
    )
}

export default Home
