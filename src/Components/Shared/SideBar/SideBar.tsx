import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import * as imgs from '../../../assets/images/'
import styles from './SideBar.module.css'
import { useState } from 'react';
import Swal from "sweetalert2";
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
  onToggle: () => void;
  isSidebarOpen: boolean;

}

export default function SideBar({ onToggle,isSidebarOpen }: SideBarProps ) {
  
    let{savaLoginData,loginData, setIsAuthenticated}=useContext(AuthContext)
      let navigate=useNavigate()

      console.log("loginData from Sidebar => ", loginData);

      const handleProfileClick = () => {
    navigate("/home/user-data", {
      state: {
        mode: "profile",   
      },
    });
  };

  

      const [iscollapsed, setiscollapsed] = useState(false);
      
     const toggleCollapse = () => {
    setiscollapsed(prev => !prev);
    onToggle && onToggle();
  };


  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
      }
    });
  };

      const handleSuccessClick = () => {
    Swal.fire({
      title: "Done!",
      text: "Action completed successfully.",
      icon: "success",
      confirmButtonText: "OK",
      timer: 2000
    });
  };


  return (
    
   <>
   
   <div className="sidebar-container">
  
  <Sidebar
  className={ isSidebarOpen ? "col-md-10 col-lg-10" : "col-10"}
        collapsed={iscollapsed}
        width="280px"         
        collapsedWidth="80px" 
      >
        <i
          onClick={toggleCollapse}
          className="fa-solid fa-bars float-end my-3"
          role="button"
          style={{ cursor: "pointer" }}
        ></i>

      <h5 className={`${styles.titlewithline} w-50`}>UMS</h5>
  <Menu>

    <div className='m-4 text-center mb-5'>
  <img className='img-fluid rounded-circle'   style={{
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
  }}
  src={loginData?.image} alt="img" ></img> 
          <h6 className='m-2 d-block w-100'>{loginData?.firstName}</h6>
          <p className='m-2 text-warning'> Admin</p>
    </div>

       



  
      <MenuItem className='m-2 sidebar-item ' icon={<i className="fa-regular fa-house"></i>} component={<Link to="/home" />}> Home</MenuItem>
    <MenuItem  className='m-2 sidebar-item ' icon={<i className="fa-regular fa-bookmark"></i>} component={<Link to="/home/user-list" />}> Users</MenuItem>
    <MenuItem  className='m-2 sidebar-item '  icon={  <i className="fa-solid fa-user-graduate"></i>} component={<Link to="/home/user-data" />}>Add user</MenuItem>
<MenuItem
  className="m-2 sidebar-item"
  icon={<i className="fa-solid fa-circle-dollar-to-slot"></i>}
  component={
    <Link
      to="/home/user-data"
      state={{ mode: "profile" ,
         userId: loginData?.id
      }}   
    />
  }
>
  Profile
</MenuItem>  </Menu>
<div className="text-center m-2">
  <button className='btn btn-danger text-center' onClick={handleLogout}>
      <i className="fa fa-sign-out-alt"></i> Log out 
    </button>
</div>
    
    
    </Sidebar>
</div>
     </>
  
  )
}
