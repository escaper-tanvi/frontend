import React,{useState,useEffect} from "react";
import { getGroups,JoinGroup,createGroup } from "../../functions/group";
// import { getProduct } from "../../functions/product";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const initialState={    
   groupName:""

};


const ShowGroup=({fetchedPid})=>{
  const [groups,setGroups] = useState([]);
    // const [values,setValues] =useState(initialState);
    const [joinGroupAble,setJoinGroupAble]=useState(true);

    const[price,setNewPrice]=useState('');
    const {user,SingleProductId}= useSelector((state)=>({...state}));

    const dispatch=useDispatch();

    const history=useHistory();

    useEffect(() => {
      const loadGroups = async() => {
        const data = await getGroups(user.token ,fetchedPid)
      console.log(data)
      data ? setGroups(data) : setGroups([])
    }
    loadGroups()
    }, [])

    const DiscountedPrice=(originalPrice)=>{
        const newPrice=((originalPrice)-((originalPrice)*12/100));
        setNewPrice(newPrice);
        console.log("newPrice",newPrice)
    }
    const SendDiscountedPrice=async()=>{
      const originalPrice = SingleProductId.price;
      DiscountedPrice(originalPrice);
    }
//     let stateData = []
// const {productId} = useSelector((state)=>({...state}));
// useEffect(()=>{
// console.log("particular product id",fetchedPid);
// },[])
//     useEffect(()=>{
//       const getData = async() => {
//        const data = await getGroups(user.token ,fetchedPid)
//       console.log(data)
//       data ? (stateData = [...data]) : (stateData = [])
//     }
//     getData();
    
// },[])
//     console.log(stateData)
//     const setDateInArr = () => {
//       for(let i = 0; i < stateData.length; i++){
//         console.log(stateData[i])
//         setGroups(stateData[i])
//       }
//     }
//     setDateInArr()
//     console.log('groups', groups)
//     // const loadGroups =()=>{
//     //     getGroups(user.token,productId[0]).then((res)=> {
//     //       console.log(res)
//     //       setGroups(res)
//     //     })
//     //   }
//       const handleChange = (e) => {
//         setValues({ ...values, [e.target.name]: e.target.value });
//         // console.log(e.target.name, " ----- ", e.target.value);
//     };
//     const handleCreateGroup =()=>{
//           history.push("/createGroup");
//  }





// const sendIdToRedux =()=>{
//   dispatch({
//     type: "SINGLE_PRODUCT_ID",
//     payload: fetchedPid,
// })
// }
const handleGroupJoin=async(groupName)=>{
    const groupDetail = { groupName };

    try {
      
      console.log(groupDetail)
      const response = await JoinGroup(fetchedPid, user.token, groupDetail)
      .then((e)=>{
        setJoinGroupAble(false);
        
        dispatch({
          type: "Group_Buying_Price",
          payload: price,
      })

      SendDiscountedPrice();

      })
      console.log(response)


    } catch (error) {
      console.error(error.message)
    }
}
    const logger =(val)=>{
        console.log(val)
      };

      return(
        <div className="container-fluid">
        <div className="row">
          
          <div className="col">
          {/* { loading? <h4 className="text-danger">Loading</h4>: <h4>Create Category</h4>} */}
        

{/* <input type="search" placeholder="Filter" value={keyword} onChange={handleSearchChange} className="form-control mb-4"></input> */}

        <hr/> 
        {groups.map((g, id)=>{
          return(
            <div className="alert alert-primary" key={id} onClick={() => handleGroupJoin(g.groupName)}>
            {g.groupName}{""}
           
          </div>
           
          )
         
        })}
          </div>
          <Link to="/createGroup" ><button  className="btn btn-warning " >Create One</button></Link>
        </div>
         
      </div>
    )
}

export default ShowGroup;