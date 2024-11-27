import {useState} from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignupForm() {
  const [load,setLoad]=useState(false);
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
    const onSubmit = (data:any) => {
                setLoad(true);
                axios.post(`${import.meta.env.VITE_BACKEND}/api/user/register`,data,{
                  header:{
                    'content-type':'application/json'
                  },
                  withCredentials:true
                })
                .then(res=>{
                  toast(res.data.message);
                  setLoad(false);
                })
                .catch(err=>{
                  console.log(err);
                  toast('Signup failed- email already exists');
                  setLoad(false);
                })
                reset();
            }
    
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <p className="py-3">
            By clicking “Sign up”, you agree to our terms of service and privacy policy.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-1'>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="email">Name {errors.name && <span className='text-sm text-red-500'> {errors.name.message}</span>}</label>
            <Input type="text" id="name" placeholder="John Doe" {...register("name", 
              { required:'name is required',
              minLength:{
                value:5,
                message:'name is too short'
              }})}/>
          </div>

          <div className="grid w-full items-center gap-1">
            <label htmlFor="email">Phone {errors.phone && <span className='text-sm text-red-500'>{errors.phone.message}</span>}</label>
            <Input type="number" id="number" placeholder="0000000000" {...register("phone", 
              { required:'phone no is required',
              minLength:{
                value:10,
                message:'phone no should 10 digit'
              },
              maxLength:{
                value:10,
                message:'phone no should 10 digit'
              } })}/>
          </div>

          <div className="grid w-full items-center gap-1">
            <label htmlFor="email">Email {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}</label>
            <Input type="email" id="email" placeholder="JohnDoe@gmail.com" {...register("email", 
            { required: 'email is required',
            pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "enter a valid email address",
            }
            })}/>
          </div>

          <div className="grid w-full items-center gap-1">
            <label htmlFor="email">Password {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}</label>
            <Input type="password" id="password" placeholder="********" {...register("password", 
            { required: 'password is required',
             minLength:{
                value:6,
                message:'too short password'
              }
             })}/>
          </div>

          <div className="grid w-full items-center gap-1 col-span-2">
            <label htmlFor="email">Address {errors.address && <span className='text-sm text-red-500'>{errors.address.message}</span>}</label>
            <Textarea placeholder="Your address here" id="address" className='resize-none' {...register("address",
            { required: 'address is required',
            minLength:{
                value:20,
                message:'enter correct address'
              }
            })}/>
          </div>
          <div className="mt-6 col-span-2">
          {
            load?<Button className='w-full' disabled>Please wait...</Button>:<Button className='w-full'>Signup</Button>
          }
          </div>
        </form>
      </div>
    </div>
  );
}