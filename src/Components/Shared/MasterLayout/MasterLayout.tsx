import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

export default function MasterLayout() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="container-fluid bg-master">
      <div className="row ">
        {isSidebarOpen && (
          <div className={` col-md-2 col-lg-2 p-0 sidebar-wrapper ${isSidebarOpen ? "open" : "closed"}`}>
            <SideBar onToggle={toggleSidebar} isSidebarOpen={isSidebarOpen}   />
          </div>
        )}

        <div className={ isSidebarOpen ? "col-md-10 col-lg-10  p-0" : "col-12  p-0" }>
          <NavBar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar}  />
          <Outlet  />
        </div>
      </div>
    </div>
  );
}
//   return (

//     <div className="d-flex">
//         <div className="w-30">
//           
//         </div>
//         <div className="w-100">
//             <NavBar/>
//             <Outlet/>
//         </div>
//     </div>
  
//   )
// }
