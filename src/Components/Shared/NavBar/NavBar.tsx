import React from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
interface NavBarProps {
  onToggleSidebar: () => void;
   isSidebarOpen: boolean;
}

export default function NavBar( { onToggleSidebar, isSidebarOpen }: NavBarProps) {


    let{savaLoginData,loginData}=useContext(AuthContext)
  
return (
    <nav className=" col-md-12 navbar bg-white m-0 p-3 w-100 ">
     
      <i
      className={`fa-solid fa-bars toggle-icon  ${isSidebarOpen ? `open overflow-visible` : ""}`}
        role="button"
        style={{ cursor: "pointer" }}
        onClick={onToggleSidebar}
      ></i>
<p>{loginData?.firstName}</p>
      {/* <span>{loginData.firstName}</span> */}

    
    </nav>
  );
}
