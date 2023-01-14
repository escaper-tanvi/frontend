import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import { response } from 'express';
import axios from 'axios'



export const SendSolForm: FC = () => {
    const [txSig, setTxSig] = useState('');
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const link = () => {
        console.log(txSig)
        urlsend(txSig)

        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ''
    }
    const [payment, setPayment] = useState(0);
    const [sol,setsol]= useState(0);

    useEffect(() => {
        const getMoney = async() => {
            try {
                const res = await fetch('http://localhost:8000/api/user/wishlist/createpaymentrequest');
                const data = await res.json()
                console.log(data.msg.price)
                setPayment(data.msg.price)
                
            } catch (error) {
                console.error(error)
            }

        }
        getMoney()
    },[])
    useEffect(()=> {
    const callAPI = async () => {
        try {
            const res = await fetch(`https://alpha-vantage.p.rapidapi.com/query?from_currency=SOL&function=CURRENCY_EXCHANGE_RATE&to_currency=INR`,{
                method: 'GET',
                headers:{
                    'X-RapidAPI-Key': 'cc1d83240emsh0763a8c06cb4689p12393ajsncf4cdc5c6189',
                    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com' 
                }
            });
            const data = await res.json();
            console.log(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            console.log()
            setsol(data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
        } catch (err) {
            console.log(err);
        }

    }
    callAPI()
},[])
//  async function getStaticProps() {
//     const { data } = await axios.get(txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`: '')
//     // const title = $('#ctitle').text()
//     // const lastScraped = new Date().toISOString()
//     console.log(data)
//     // return {
//     //   props: { title, lastScraped },
//     //   revalidate: 10,
//     // }
//   }
const urlsend = async (txSig) => {
    try {
        
        const urlData = {url: `https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
        const res = await axios.post(`http://localhost:8000/api//user/wishlist/successcrypto`, urlData);
        const data = await res.data;
        console.log(urlData)
        // console.log(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        // console.log()
        // setsol(data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
    } catch (err) {
        console.log(err);
    }

}

    const sendSol = event => {
        event.preventDefault()
        if (!connection || !publicKey) { return }
        const transaction = new web3.Transaction()
        const recipientPubKey = new web3.PublicKey("A5CY3b2WdSo7x8aQ5Ast4qhsGuoFjVxEPaYQwZ9qvRGu")
        console.log(recipientPubKey)

        const sendSolInstruction = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPubKey,
            lamports: LAMPORTS_PER_SOL * (payment / sol)
        })
        console.log(publicKey)
        console.log(recipientPubKey)
        console.log(LAMPORTS_PER_SOL * (payment / sol))


        transaction.add(sendSolInstruction)
        sendTransaction(transaction, connection).then(sig => {
            setTxSig(sig)
        })
        // getStaticProps()
        
    }

    return (
        <div>
            {
                publicKey ? 
                <div>
                    <p>{publicKey ? `Amount to be Paid : ${payment} INR --> ${payment / sol} SOL` : ''}</p>
                    <button onClick={sendSol} type="submit" className={styles.formButton}>Send</button>
                </div>
                    // <form onSubmit={sendSol} className={styles.form}>
                    //     {/* <label htmlFor="amount">Amount (in SOL) to send:</label>
                    //     <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                    //     <br />
                    //     <label htmlFor="recipient">Send SOL to:</label>
                    //     <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required /> */}
                    //     <button type="submit" className={styles.formButton}>Send</button>
                    // </form> 
                    :
                    <span>Connect Your Wallet</span>
            }
            {
                txSig ?
                    <div>
                        <p>View your transaction on </p>
                        <button onClick={link}>Solana Explorer</button>
                    </div> :
                    null
            }
        </div>
    )
}