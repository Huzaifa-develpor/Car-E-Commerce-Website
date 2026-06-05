import {useState, useEffect , createContext } from "react";
import axios from "axios";
const productContext = createContext()
const Context =({children})=>{
        const [carList,setCarList]= useState([])

        useEffect(() => {
           axios.get('https://car-e-commerce-website-production.up.railway.app/web/api/products/view')
           .then((res)=>{
            setCarList(res.data.cars)
           })
           .catch((err)=>{
            console.log(err)
           })
           
        },[])
        
    return(
      
        <productContext.Provider value={{carList}}>
            {children}
        </productContext.Provider>

    
    )
}

export {productContext};
export default Context