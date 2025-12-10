import axios, { Axios } from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import { useApiGet } from "../Shared/Hooks/useApi";



export default function UsersList() {
   let navigate=useNavigate()

   const handleAddClick = () => {
    navigate("/home/user-data", {
      state: {
        mode: "add",   
      },
    });
  };
const handleEditClick = (userId: string) => {
    navigate("/home/user-data", {
      state: {
        mode: "edit",
        userId,   
      },
    });
  };

   const [users, setUsers] = useState([])
   const [userName, setUserNAMe] = useState("")



   const { data, isLoading, isError, error } = useApiGet<{ users: User[] }>(
  ['users'],   // اسم الكاش
  '/users',    // بيكمل على الـ BASE_URL => https://dummyjson.com/users
  true         // enabled
);

//    let getUsers=async()=>{
//     try{
//  let response=await axios.get('https://dummyjson.com/users')
//      setUsers(response.data.users);
//     }
//     catch{
//      toast.error(" user baaaaaaaaaaaaz");

//     }
//    }


 



   useEffect(() => {
     if (data?.users) {
    setUsers(data.users);
  }
   
    
   }, [data])
//   if (isError) {
    
//     toast.error('user baaaaaaaaaaaaz');
//     return (
//       <div className="text-center text-danger py-5">
//         <h5>Something went wrong</h5>
//         <p>{(error as Error).message}</p>
//       </div>
//     );
//   }

//   if (isLoading) {
//   return (
//     <div className="d-flex justify-content-center align-items-center py-5">
//       <div className="spinner-border" role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//       <span className="ms-2">Loading users...</span>
//     </div>
//   );
// }
    const [show, setShow] = useState(false);
     const [userid, setUserId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (user:any ) =>{
    // alert(user.id)
       setUserId(user.id)
       setUserNAMe(user.username)
     setShow(true);}
  



       let deleteUser=async()=>{
    try{
       let response=await axios.get(`https://dummyjson.com/users/${userid}`)
       console.log(response)
       handleClose()
       toast.success(`successfully ${userName} deleted`);



    }
    catch{
           toast.error("m3rfnaaa4 n3ml delete");

    }

   }


  const handleDelete = (id: number) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`https://dummyjson.com/users/${id}`)
       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      // نادى API للحذف
      // امسح من ال UI
      Swal.fire("Deleted!", "User has been deleted.", "success");
    }
  });
};
   
  return (
   <>
{/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Want To Delete This User {userName}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
No          </Button>
        </Modal.Footer>
      </Modal>
   <div className="container d-flex justify-content-between m-2">
    <h3>Users List</h3>
  <button 
  onClick={() => handleAddClick()}
  className="btn btn-color .auth-container_bg"
>
  Add New user
</button>
   </div>



     <div className="table-container m-3">
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
         <th scope="col">E-mail</th>
      <th scope="col">Phone</th>
       <th scope="col">Date of Admission</th>
    </tr>
  </thead>
  <tbody>
   {users.map(user=> <tr>
      
      <td><img className='w-25 img-fluid' alt="img" src={user.image}></img></td>
      <td>{user.username}</td>
      <td>{user.email}</td>
        <td>{user.phone}</td>
      <td>{user.birthDate}</td>
       <td>
                <i className='fa fa-edit text-warning ' aria-hidden="true"  onClick={() => handleEditClick(user.id)}></i>

<i
  className="fa fa-trash text-warning"
  aria-hidden="true"
  onClick={() => handleDelete (user.id)}
></i>       </td>
    </tr>)}
  
    
  </tbody>
</table>
    </div>
   </>
  )
}
