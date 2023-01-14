import axios from 'axios';

export const createGroup = async (productId,authtoken,GroupDetails)=>
    await axios.post(
        `${process.env.REACT_APP_API}/product/${productId}/Group`,{
            GroupDetails
        }
        ,
        {
          headers: {
            authtoken,
          },
        }
      );

      export const getGroups = async (authtoken,productId) =>{
        const res = await axios.get(`${process.env.REACT_APP_API}/product/${productId}/Group`, {
            headers: {
                authtoken
            }
        })
        return res.data
      }


      export const JoinGroup = async (productId,authtoken,GroupDetails)=>{
    const res = await axios.put(
        `${process.env.REACT_APP_API}/product/${productId}/JoinGroup`,{
            GroupDetails
        }
        ,
        {
          headers: {
            authtoken,
          },
        }
      )
    return res.data;
    };