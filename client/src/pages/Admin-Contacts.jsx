import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
  const { LoginUserToken } = useAuth();
  const [contact, setContact] = useState([]);

  const getAllContactData = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: LoginUserToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setContact(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteContact = async(id)=>{
    try {
      const response = await fetch(`${window.location.origin}/api/admin/contacts/delete/${id}`,{
        method: "DELETE",
        headers:{
          Authorization: LoginUserToken
        },
       })
       if(response.ok){
          getAllContactData();
       }
    } catch (error) {
      console.log(error);
    }
   
}

  useEffect(() => {
    getAllContactData();
  }, []); // Empty dependency array to run only once on mount

   

  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact data</h1>
        <div className="container admin-contact">
          <div className="grid-container">
            {contact.map((currElem, index) => (
              <div key={index} className="admin-contact-card">
                <p>{currElem.username}</p>
                <p>{currElem.email}</p>
                <p>{currElem.message}</p>
                <button className="btn admin-delete-btn" onClick={()=>{DeleteContact(currElem._id)}}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
