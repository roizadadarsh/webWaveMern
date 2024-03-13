import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

//provider

export const AuthProvider = ({children})=>{
    
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [user,setUser] = useState("");
    const [isLoading,setIsLoading] = useState(true);
    const [servicesData,setservicesData] = useState([]);
    const LoginUserToken = `Bearer ${token}`;

    const setTokenLs = (serverToken)=>{
      setToken(serverToken);
       localStorage.setItem('token',serverToken);
    }

    let isLoggedin = !! token;  // this line means if a token is get or not basically it works as a ternary operator.


    // handling logout functionalities
    const LogOutUser = ()=>{
       setToken("");
       return localStorage.removeItem("token");
    }

    const userAuthentication=async()=>{
       try {
         setIsLoading(true);
         const response = await fetch(`${window.location.origin}/api/auth/user`,{
            method: "GET",
            headers: {
               Authorization: LoginUserToken
            },
         })
         if(response.ok){
            const data = await response.json();
            console.log(data.userData);
            setUser(data.userData);
            setIsLoading(false);
         }
         else{
            setIsLoading(false);
         }
       } catch (error) {
         console.error("Error while fetching data");
       }
    }
     // to get services data from backend to fronted
      
     const getServicesData = async()=>{
        try {
         const response = await fetch(`${window.location.origin}/api/data/service`,{
            method: "GET"
         })
          if(response.ok){
            const data = await response.json();
            console.log(data.msg);
            setservicesData(data.msg)
          }
        } catch (error) {
         
        }
     }


    // user authentication to verify jwt token

      useEffect(()=>{
         getServicesData();
         userAuthentication();
      },[])



   return <AuthContext.Provider value={{setTokenLs,LogOutUser,isLoggedin,user,servicesData,LoginUserToken,isLoading}}>

    {children}
   </AuthContext.Provider>
}

//consumer

export const useAuth = ()=>{
  const authContextValue = useContext(AuthContext);
  return authContextValue;
}


