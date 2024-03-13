import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "../src/pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Error from "./pages/Error";
import Footer from "./components/footer/footer";
import Logout from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-update";
const App = ()=>{
  return (
    <>
     <BrowserRouter> 
       <Navbar/>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="/contact" element={<Contact/>}/>
         <Route path="/services" element={<Services/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/logout" element={<Logout/>}/>
         <Route path="*" element = {<Error/>}/>
         {/* nested route */}
         <Route path="/admin" element = {<AdminLayout/>}>
           <Route path="users" element={<AdminUsers/>}/>
           <Route path="contacts" element={<AdminContacts/>}/>
           <Route path= "users/:id/edit" element={<AdminUpdate/>} />

         </Route>
       </Routes>
       <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App;