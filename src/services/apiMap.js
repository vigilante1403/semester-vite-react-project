import axios from "axios"

export const getLocation = async({location})=>{
const {data,error}=await axios.post('/maps/locations',null,{
    params:{
        address:location
    }
})
if(error)throw new Error(error.message)
    return data;
}