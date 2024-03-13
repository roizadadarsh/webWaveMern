import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../store/auth"
import {toast} from "react-toastify"

export const AdminUpdate = ()=>{

  const [data,setData] = useState({
    username: "",
    email : "",
    phone: ""
  })

  const params = useParams();
  const {LoginUserToken} = useAuth();

  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value
    })
  }

  const getSingleData = async()=>{
    try {
      const response = await fetch(`${window.location.origin}/api/admin/users/${params.id}`,{
        method: "GET",
        headers:{
          Authorization: LoginUserToken
        },
       })
       const data = await response.json();
        console.log(`users Single data ${data}`);
        setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
     getSingleData();
  },[])
    
   const handleSubmit = async(e)=>{
      e.preventDefault();

      try {
        const response = await fetch(`${window.location.origin}/api/admin/users/update/${params.id}`,{
          method: "PATCH",
          headers:{
            "Content-Type": "application/json",
            Authorization: LoginUserToken
          },
           body: JSON.stringify(data)
        })
         if(response.ok){
          toast.success("Update Successfull");
         }
         else{
          toast.error("Not Updated");
         }
          
        
      } catch (error) {
        console.log(error)
      }
    
   }

   
  return(
    
    <section className="section-contact">
    <div className="contact-content container">
      <h1 className="main-heading">Update User Data</h1>
    </div>
    {/* contact page main  */}
    <div className="container grid grid-two-cols">
      {/* contact form content actual  */}
      <section className="section-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              value={data.username}
              onChange={handleInput}
              required
            />
          </div>

          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={data.email}
              onChange={handleInput}
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Mobile</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              autoComplete="off"
              value={data.phone}
              onChange={handleInput}
              required
            />
          </div>

          <div>
            <button type="submit">update</button>
          </div>
        </form>
      </section>
    </div>
  </section>

  );
}