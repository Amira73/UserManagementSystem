import React, { useContext } from 'react'
import styles from './Login.module.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../Context/AuthContext'

export default function Login() {
  let{savaLoginData}=useContext(AuthContext)
  let navigate=useNavigate()
   let {register,
    handleSubmit,
    formState:{errors}
  
   }=useForm()
let onSubmit = async (data: any) => {
  try {
    const response = await axios.post(
      "https://dummyjson.com/auth/login",
      data
    );

    
    localStorage.setItem("token", response.data.accessToken);

    toast.success("mabrooooooooooook 3mlna login");
    savaLoginData();
    navigate("/home/user-list");
  } catch (error) {
    toast.error("login baaaaaaaaaaaaz");
    console.log(error);
  }
};
  return (
   <div className="vh-100 auth-container_bg">
  <div className={`${styles.card} container vh-100 d-flex justify-content-center align-items-center`}>

    <div className=" col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6">
      <div className="login bg-light p-4 rounded rounded-5  mb-2">
<div className="text-center">
  <h1 className={`${styles.titlewithline} h4 d-inline-block mb-4`}>
    User Management System
  </h1>
</div>        <div className="text-center">
          <h5>SIGN IN</h5>
          <p className='text-gray-color'>Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className='lable-color'>User Name</label>
            <input
              type="text"
              className="form-control my-2 "
              {...register("username", {
                required:"user name is required",
                              
               })}
              placeholder="Username"
            />
          </div>
          {errors.username && <p className='alert alert-danger'>{errors?.username.message}</p>}

          <div className="mb-3">
            <label className='lable-color'>Password</label>
            <input
              type="password"
              className="form-control my-2 "
               {...register("password",{
                required:"password is required"
               }

  )}
              placeholder="Password"
            />
          </div>
{errors.password && <p className='alert alert-danger'>{errors?.password?.message}</p>}
          <button className="btn auth-container_bg w-100 my-3">SIGN IN</button>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}
