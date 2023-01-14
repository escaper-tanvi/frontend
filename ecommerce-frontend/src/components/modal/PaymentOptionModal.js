import React, { useState,useEffect } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ShowGroup from "./GroupBuyingPage";
const PaymentOptionModal = ({ children  , p}) => {
const dispatch=useDispatch();
const [fetchedPid,setFetchPid]= useState("");

    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);
    let history = useHistory();                  


    useEffect(()=>{
        console.log("option model present sir",p)
    },[])
    const handleModal = () => {

       dispatch({
                type: "SINGLE_PRODUCT_ID",
                payload: p,
            })
           
        if (user && user.token) {
            setModalVisible(true)
            // history.push("/login")
           
        } else {
            //
        }
    }
    const handleJoinGroup=()=>{
        // dispatch({
        //     type: "PRODUCT",
        //     payload: p._id,
        // })
        console.log("option model present sir",p._id)
        setFetchPid(p._id);
    }
    return (
        <>
            {/* <div onClick={handleModal}>
            <Button  disabled={!cart.length}
                                className={"btn btn-sm btn-primary mt-2 btn-raised"}>
                            Pay With Group
                        </Button>
            </div> */}
            <div onClick={handleModal}>
            <UsergroupAddOutlined onClick={handleJoinGroup} className={"text-danger pointer p-3"} style={{ display: "block" }} />
            </div>
            <Modal
                title="Join/Create a Group."
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false);
                    // toast.success("Thanks for your review.");
                }}
                onCancel={() => { setModalVisible(false); }}>
                <ShowGroup fetchedPid={fetchedPid}/>
            </Modal>

        </>
    )
}

export default PaymentOptionModal;