import React from "react";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async(e) => {
    e.preventDefault();
    const {name, email, password}= data
    try{
      const{data}= await axios.post('/register',{
        name,email,password
      })
      if(data.error){
        toast.error(data.error)
      } else{
        setData({})
        toast.success("Login Successful. welcome")
        navigate('/login')
      }
    }
    catch(error){
      console.log(error)

    }
  };
  return (
    <div>
      <form action="" onSubmit={registerUser}>
        <label> Name</label>
        <input
          type="text"
          name="name"
          placeholder="enter your name:"
          id="name" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="enter your email:"
          id="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}
        />
        <label> Password</label>
        <input
          type="password"
          name="password"
          placeholder="enter your password:"
          id="password" value={data.password} onChange={(e)=>setData({...data, password:e.target.value})}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
