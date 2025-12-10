import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import './App.css';
import ProtectedRoute from './Components/Context/ProtectedRoute';
import Login from './Components/Login/Login';
import Material from './Components/Material/Material';
import AuthLayout from './Components/Shared/AuthLayout/AuthLayout';
import MasterLayout from './Components/Shared/MasterLayout/MasterLayout';
import Notfound from './Components/Shared/Notfound/Notfound';
import UpdareUser from './Components/UpdateUser/UpdareUser';
import UserData from './Components/UserData/UserData';
import UserProfile from './Components/UserProfile/UserProfile';
import UsersList from './Components/UsersList/UsersList';



function App() {





  const routes=createBrowserRouter([{
    path:'',
    element:<AuthLayout/>,
    errorElement:<Notfound/>,
    children:
    [{index:true,element:<Login  />},
     {path:'login',element:<Login  />},
      {path:'mui',element:<Material  />},
    ]
  },{
    path:'home',
    element:<MasterLayout/>,
    errorElement:<Notfound/>,
    children:
    [{index:true,element:<UsersList/>},
        { path: 'user-list', element: <ProtectedRoute element={<UsersList />} /> },
        { path: 'user-profile', element: <ProtectedRoute element={<UserProfile />} /> },
        { path: 'user-data', element: <ProtectedRoute element={<UserData />} /> },
        { path: 'user-update', element: <UpdareUser /> },
    ]
  }])
 


  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
