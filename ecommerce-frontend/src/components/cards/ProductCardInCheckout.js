import React, { useEffect } from "react";
import ModalImage from 'react-modal-image'
import laptop from "../../images/laptop.png"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined ,UsergroupAddOutlined } from "@ant-design/icons";
import PaymentOptionModal from "../modal/PaymentOptionModal";
// import ShowGroup from "../Modal/GroupBuyingPage";

const ProductCardInCheckout = ({ p }) => {

    const colors = ["Black", "Brown", "Silver", "White", "Blue"]
    let dispatch = useDispatch();

    const handleColorChange = (e) => {
        //console.log("COLOR CHANGED ---> ", e.target.value);
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }

            cart.map((product, index) => {
                if (product._id === p._id) {
                    cart[index].color = e.target.value;
                    
                }
            })
            //console.log('cart update color', cart)
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }

    const handleQuantityChange = (e) => {
        let count = e.target.value < 1 ? 1 : e.target.value;
        if (count > p.quantity) {
            toast.error(`Maximum available quantity is : ${p.quantity}`)
            return;
        }

        //console.log("QUANTITY CHANGED ---> ", e.target.value);
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }

            cart.map((product, index) => {
                if (product._id === p._id) {
                    cart[index].count = count;
                }
            })
            //console.log('cart update quantity', cart)
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }
 
   useEffect(()=>{
    console.log("ProductCardCheckout",p)
   },[])
    const handleRemove = () => {
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }

            cart.map((product, index) => {
                if (product._id === p._id) {
                    //[0,1,2,3,4] - splice will remove from position "index" 1 item (second argumnet of splice fun.)
                    cart.splice(index, 1)   
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }
    

    const handleJoinGroup =()=>{
        //
    }

    // const handlereduxState=(p)=>{
    //     let array = [p._id]
       
            
    //     // array.push(cart[i]._id);
        
    //         dispatch({
    //             type: "PRODUCT",
    //             payload: array,
    //         })
    // }

    return (
        <><tbody>
            <tr>
                <td>
                    <div className={"align-center"} style={{
                        width: "50px", height: "auto",
                        display: "block", marginLeft: "auto", marginRight: "auto"
                    }}>

                        {p.images.length ? (<ModalImage small={p.images[0].url} large={p.images[0].url} />) :
                            (<ModalImage small={laptop} large={laptop} />)}

                    </div>
                </td>
                <td> {p.title} </td>
                <td> {p.price} </td>
                <td> {p.brand} </td>
                <td>
                    <select onChange={handleColorChange} name={"color"} className={"form-control"}>
                        {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}

                        {colors.filter((c) => c !== p.color).map((c) => <option key={c} value={c}>
                            {c}
                        </option>)}

                    </select>
                </td>
                <td className={"text-center"}>
                    {/* <input type={"number"} className={"form-control"}
    value={p.count} onChange={handleQuantityChange}/> */}

                    <input type="number" className={"form-control"}
                        value={p.count} onChange={handleQuantityChange}></input>
                </td>
                <td>
                    {p.shipping === "Yes" ? <CheckCircleOutlined className={"text-success p-3"} style={{ display: "block" }} />
                        : <CloseCircleOutlined className={"text-danger  p-3"} style={{ display: "block" }} />}
                </td>
                <td>
                    <CloseOutlined onClick={handleRemove} className={"text-danger pointer p-3"} style={{ display: "block" }} />
                </td>
                <td> <PaymentOptionModal p={p} >
                        
                         </PaymentOptionModal></td>
            </tr>
        </tbody>
        </>
    )
}

export default ProductCardInCheckout
