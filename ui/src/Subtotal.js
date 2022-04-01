import React, {useState, useEffect} from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import logo from './images/eth-logo.png'
import Web3 from 'web3';
import Contract from './blockchain/Ecommerce';

function Subtotal() {
    const [{basket}, dispatch] = useStateValue()
    const [web3, setWeb3] = useState('')
    const [account, setAccount] = useState('')
    const [contract, setContract] = useState('')

    // load provider
    useEffect(() => {
        const loadProvider = async() => {

            if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
                try{
                    const web3 = new Web3(window.ethereum)
                    setWeb3(web3)

                    // get accounts
                    const accounts = await web3.eth.getAccounts()
                    setAccount(accounts[0])

                    // load local copy of smart contract
                    const contract = Contract(web3)
                    setContract(contract)
                }
                catch(err){
                    alert(err.message)
                }
            }
            else{
                alert("Please install Metamask!")
            }

        }

        loadProvider()
    }, [])

    // handle the purchase
    const purchase = async() => {
        // get ids of cart items and push to an array
        let basketIds = []
        for(let i=0; i<basket.length; i++){
            basketIds.push(basket[i].id)
        }

        console.log(basketIds)
        
        try{
            await contract.methods.purchaseProduct(basketIds, "Darlington", "Greenhouse").send({
                from: account,
                value: web3.utils.toWei((getBasketTotal(basket)/100000).toString(), "ether")
            })

            alert("Your products has been purchased Succesfully")
            window.location.reload()
        }
        catch(err){
            alert(err.message)
        }
        
    }

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText = {(value) => (
                    <>
                        <p>
                            Subtotal({basket.length} items): <img src={logo} width="15" alt="ethereum logo" /><strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" />This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={6}
                value={getBasketTotal(basket)/100000}
                displayType={"text"}
                thousandSeparator={true}
            />
            {account ? <button onClick={purchase}>Checkout</button> : <button onClick={purchase} disabled>Connect Wallet</button>}
            
        </div>
    )
}

export default Subtotal
