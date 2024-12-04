import {useState} from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

export default function AdminLogin() {
  const [load,setLoad]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
    const onSubmit = (data:any) => {
                setLoad(true);
                axios.post(`${import.meta.env.VITE_BACKEND}/api/admin/login`,data,{
                  headers:{
                    'content-type':'application/json'
                  },
                  withCredentials:true
                })
                .then(res=>{
                  toast(res.data.message);
                  setLoad(false);
                  navigate('/admin');
                  dispatch({type:'adminTrue'})
                })
                .catch(err=>{
                  console.log(err);
                  toast('Login failed- invalid credential');
                  setLoad(false);
                })
                reset();
            }
  
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-left">
          <p className="">Enter admin login credentials</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-1 mt-4">
            <label htmlFor="email">Email {errors.email && <span className='text-sm text-red-500'> is required</span>}</label>
            <Input type="text" id="email" placeholder="admin@gmail.com" {...register("email", { required: true })}/>
          </div>
          <div className="grid w-full items-center gap-1 mt-4">
            <label htmlFor="email">Password {errors.password && <span className='text-sm text-red-500'> is required</span>}</label>
            <Input type="text" id="password" placeholder="admin password" {...register("password", { required: true })}/>
          </div>
          <div className="mt-6">
          {
            load?<Button className='w-full' disabled>Please wait...</Button>:<Button className='w-full'>Login</Button>
          }
          </div>
        </form>
      </div>
    </div>
  );
}