import {useState} from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios';
import toast from 'react-hot-toast';
import {useDispatch} from 'react-redux';


export default function SignupForm() {
  const [load,setLoad]=useState(false);
  const [flag,setFlag]=useState(false);
  const [show,setShow]=useState(false);
  const [userData, setUserData]=useState({});
  const [otp,setOtp]=useState("");
  const dispatch=useDispatch();
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
    const formData = (data:any) => {
                setLoad(true);
                setUserData(data);
                axios.post(`${import.meta.env.VITE_BACKEND}/api/user/register`,data,{
                  headers:{
                    'content-type':'application/json'
                  },
                  withCredentials:true
                })
                .then(res=>{
                  toast(res.data.message);
                  setLoad(false);
                  setFlag(true);
                })
                .catch(err=>{
                  console.log(err);
                  toast('Signup failed- email already exists');
                  setLoad(false);
                })
                reset();
            }

      const otpData = (e:any) => {
        e.preventDefault();
                setLoad(true);
                axios.post(`${import.meta.env.VITE_BACKEND}/api/user/register/verify`,{...userData,valid_otp:otp},{
                  headers:{
                    'content-type':'application/json'
                  },
                  withCredentials:true
                })
                .then(res=>{
                  toast(res.data.message);
                  setLoad(false);
                  setOtp(0);
                  setFlag(false);
                  dispatch({type:'stateTrue'});
                })
                .catch(err=>{
                  console.log(err);
                  toast('invalid otp');
                  setLoad(false);
                  setOtp(0);
                })
                reset();
            }
    
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {
          flag?
          <form onSubmit={otpData}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="grid w-full items-center gap-1">
            <label htmlFor="otp">Enter the 6 digit OTP</label>
            <Input type="number" id="otp" placeholder="000000" value={otp} onChange={e=>setOtp(e.target.value)}/>
          </div>
          </div>
          <div className="mt-6">
          {
            load?<Button className='w-full' disabled>Please wait...</Button>:<Button className='w-full'>Signup</Button>
          }
          </div>
        </form>
        :
        <form onSubmit={handleSubmit(formData)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="grid w-full items-center gap-1">
            <label htmlFor="name">Name {errors.name && <span className='text-sm text-red-500'>{typeof errors.name.message === 'string' ? errors.name.message : 'Invalid email'}</span>}</label>
            <Input type="text" id="name" placeholder="John Doe" {...register("name", 
              { required:'name is required',
              minLength:{
                value:5,
                message:'name is too short'
              }})}/>
          </div>

          <div className="grid w-full items-center gap-1">
            <label htmlFor="number">Phone {errors.phone && <span className='text-sm text-red-500'>{typeof errors.phone.message === 'string' ? errors.phone.message : 'Invalid email'}</span>}</label>
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
            <label htmlFor="email">Email {errors.email && <span className='text-sm text-red-500'>{typeof errors.email.message === 'string' ? errors.email.message : 'Invalid email'}</span>}</label>
            <Input type="email" id="email" placeholder="JohnDoe@gmail.com" {...register("email", 
            { required: 'email is required',
            pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "enter a valid email address",
            }
            })}/>
          </div>

          <div className="grid w-full items-center gap-1">
            <label htmlFor="password">Create password {errors.password && <span className='text-sm text-red-500'>{typeof errors.password.message === 'string' ? errors.password.message : 'Invalid email'}</span>}</label>
            <div className="flex items-center border rounded-lg">
            <Input type={show?"text":"password"} className='border-0' id="password" placeholder="********" {...register("password", 
            { required: 'password is required',
             minLength:{
                value:6,
                message:'too short password'
              }
             })}/>
            <i className={`mr-3 ${show?"bi-eye-slash":"bi bi-eye"} `} onClick={()=>setShow(!show)} ></i>
          </div>
          </div>

          <div className="grid w-full items-center gap-1">
            <label htmlFor="address">Address {errors.address && <span className='text-sm text-red-500'>{typeof errors.address.message === 'string' ? errors.address.message : 'Invalid email'}</span>}</label>
            <Textarea placeholder="Your address here" id="address" className='resize-none' {...register("address",
            { required: 'address is required',
            minLength:{
                value:15,
                message:'enter correct address'
              },
            maxLength:{
                value:25,
                message:'address is too long'
              }
            })}/>
          </div>
          </div>
          <div className="mt-6">
          <p className="my-1 text-center">OTP will be send to your given email address.</p>
          {
            load?<Button className='w-full' disabled>Please wait...</Button>:<Button className='w-full'>Send OTP</Button>
          }
          </div>
        </form>
      }

        
      </div>
    </div>
  );
}