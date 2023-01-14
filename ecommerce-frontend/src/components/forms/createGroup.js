import React, { useState,useEffect } from "react";
import AdminNav from "../nav/AdminNav";
import { toast } from "react-toastify";
import { getGroups,createGroup } from "../../functions/group";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";


const  CreateGroupPage =({history,match})=>{ // match basically contains the params. and since the whole application is
    // bounded by brwserouter we do not need to use useparams hook here.



  const {user,productId,SingleProductId} = useSelector((state)=>({ ...state})); 
  

  const[name,setName]=useState('');
  const [loading,setloading]=useState(false);
  const [groups,setGroups] = useState([]);

// useEffect(()=>{
//   loadCategories();
// },[])

// const loadCategories =()=>{
//   getGroup().then((e)=> setName(e.data.name))
// }

const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(name)
    createGroup(SingleProductId,user.token,name)
    .then(res=>{
      console.log(res);
      window.alert(`"${res.data.groupName} is created"`)   
     
    })
    .catch(err=> {
        // console.log(err)
        toast.error(err.response.data.err) //this looks wierd but its how we can see what actually the error is
}
)
}

useEffect(()=>{
  const loadGroups = async() => {
    try {
     const res = await getGroups(user.token, );
     console.log(res)
    }catch(err){
      console.error(err.message)
    }

  };
  loadGroups()
},[])
    
    
    const GroupForm=()=>{
        return(
            <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Name</label>
            <input
            type="text"
            className="form-control"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            autoFocus
            required
            ></input>
            <br/>
            <button className="btn btn-outline-primary">Create</button>
        </div>
        </form>
        )
        
    }
    return(
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav/>
          </div>
          <div className="col">
          { loading? <h4 className="text-danger">Loading</h4>: <h4>Create a Group</h4>}
        {GroupForm()}
        <hr/>
        
           
         
          </div>
        
        </div>
         
      </div>
    )
};

export default CreateGroupPage;