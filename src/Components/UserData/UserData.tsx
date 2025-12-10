import React, { useEffect } from "react";
import styles from "./UserData.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import * as imgs from '../../assets/images'

type Mode = "add" | "edit" |"profile";
import { useState } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  birthDate: string;

}

export default function UserData() {
  const [profileImage, setProfileImage] = useState<string | undefined>();

  const location = useLocation();
  const { mode, userId } = (location.state || {}) as {
    mode?: Mode;
    userId?: string | number;
  };

   const isAddMode = mode === "add";
  const isEditMode = mode === "edit";
  const isProfileMode = mode === "profile";


  const isUpdateMode = isEditMode || isProfileMode;
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  
  useEffect(() => {
    if (isEditMode && userId) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`https://dummyjson.com/users/${userId}`);
          const user = res.data;
          setProfileImage(user.image);
          reset({

            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            age: user.age ? String(user.age) : "",
            birthDate: user.birthDate || "",
            
          });
        } catch (error) {
          console.error(error);
          toast.error("m4 3arf ageeb user data");
        }
      };

      fetchUser();
    }
  }, [isEditMode, userId, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEditMode && userId) {
      
        await axios.put(`https://dummyjson.com/users/${userId}`, data);
        toast.success("mabrooooooooooook 3mlna Update");
      } else {
       
        await axios.post("https://dummyjson.com/users/add", data);
        toast.success("mabrooooooooooook 3mlna Add");
      }

      navigate("/home/user-list");
    } catch (error) {
      console.error(error);
      toast.error(
        isEditMode ? " m4 3arf a3ml update" : " m4 3arf a3ml add"
      );
    }
  };

  return (
    <>
      <h3 className="mx-3">
      {isAddMode ? "Add User" : isEditMode ? "Update User" : "Profile"}
      </h3>
      <div className="div-bg"></div>

      <div className="bg-master  container-fluid min-vh-100 d-flex justify-content-center align-items-center">
        <div className="bg-white col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
          <div className="bg-white profile-card  login bg-light p-5 m-0 rounded rounded-7 mb-2">
          {isProfileMode && profileImage && (
  <div className="profile-avatar-wrapper">
    <img
      src={imgs.profile}
      alt="img"
      className="profile-avatar"
    />
  </div>
)}
            {/* هنا التعديل المهم: */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="container">
                <div className="row">
                  {/* العمود الأول */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="lable-color">First Name</label>
                      <input
                        type="text"
                        className="form-control my-2"
                        placeholder="First Name"
                        {...register("firstName", {
                          required: "First name is required",
                          pattern: {
                            value: /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/,
                            message:
                              "First name must contain only letters and be at least 2 characters",
                          },
                        })}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="alert alert-danger">
                        {errors.firstName.message}
                      </p>
                    )}

                    <div className="mb-3">
                      <label className="lable-color">E-mail</label>
                      <input
                        type="email"
                        className="form-control my-2"
                        placeholder="E-mail"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="alert alert-danger">
                        {errors.email.message}
                      </p>
                    )}

                    <div className="mb-3">
                      <label className="lable-color">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control my-2"
                        placeholder="Phone Number"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10,15}$/,
                            message: "Phone must be 10 to 15 digits",
                          },
                        })}
                      />
                    </div>
                    {errors.phone && (
                      <p className="alert alert-danger">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* العمود الثاني */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="lable-color">Last Name</label>
                      <input
                        type="text"
                        className="form-control my-2"
                        placeholder="Last Name"
                        {...register("lastName", {
                          required: "Last name is required",
                          pattern: {
                            value: /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/,
                            message:
                              "Last name must contain only letters and be at least 2 characters",
                          },
                        })}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="alert alert-danger">
                        {errors.lastName.message}
                      </p>
                    )}

                    <div className="mb-3">
                      <label className="lable-color">Age</label>
                      <input
                        type="text"
                        className="form-control my-2"
                        placeholder="Age"
                        {...register("age", {
                          required: "Age is required",
                          pattern: {
                            value: /^(1[89]|[2-5][0-9]|60)$/,
                            message: "Age must be between 18 and 60",
                          },
                        })}
                      />
                    </div>
                    {errors.age && (
                      <p className="alert alert-danger">
                        {errors.age.message}
                      </p>
                    )}

                    <div className="mb-3">
                      <label className="lable-color">Birth Date</label>
                      <input
                        type="date"
                        className="form-control my-2"
                        placeholder="Birth Date"
                        {...register("birthDate", {
                          required: "Birth date is required",
                          validate: {
                            notFuture: (value) =>
                              new Date(value) <= new Date() ||
                              "Birth date cannot be in the future",
                          },
                        })}
                      />
                    </div>
                    {errors.birthDate && (
                      <p className="alert alert-danger">
                        {errors.birthDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

             {!isProfileMode && (
  <button className="btn btn-color w-50 my-3 d-block m-auto">
    {isAddMode ? "Add" : "Update"}
  </button>
)}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}