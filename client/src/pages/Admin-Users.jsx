import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

import { useAuth } from "../store/auth"

export const AdminUsers = ()=>{
  const {LoginUserToken} = useAuth();
  const [users,setUsers] = useState([]);
  const getAllUserData = async()=>{

   try {
     const response = await fetch(`${window.location.origin}/api/admin/users`,{
      method: "GET",
      headers:{
        Authorization: LoginUserToken
      },
     })
     const data = await response.json();
     setUsers(data);

   } catch (error) {
    console.log(error);
   }
  }

  // delete the user while clicking delete button

  const deleteUser = async(id)=>{
    try {
      const response = await fetch(`${window.location.origin}/api/admin/users/delete/${id}`,{
        method: "DELETE",
        headers:{
          Authorization: LoginUserToken
        },
       })
       const data = await response.json();
        console.log(`users after delete ${data}`);
       if(response.ok){
        getAllUserData();
       }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllUserData();
  },[])

  return ( <>
    <section className="admin-users-section">
       <div className="container">
        <h1>Admin Users Data</h1>
        </div>
     <div className="container admin-users">
         <table>
           <thead>
              <tr>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Phone</th>
                 <th>Update</th>
                 <th>Delete</th>
              </tr>
           </thead>
             <tbody>
             {users.map((currElem,index)=>{
             return <tr key={index}>
                <td>{currElem.username}</td>
                <td>{currElem.email}</td>
                <td>{currElem.phone}</td>
                <td><Link to={`/admin/users/${currElem._id}/edit`}>Edit</Link></td>
                <td><button className="button" onClick={()=>deleteUser(currElem._id)}>Delete</button></td>

             </tr>
            
            
            })
             }
             </tbody>
         </table>
       
      
   </div> 
  </section>
  </>
  )
}