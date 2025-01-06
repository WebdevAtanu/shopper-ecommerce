import {useState} from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { toast } from "sonner"
import {useDispatch} from 'react-redux';

export default function UserLogin() {
  const [load,setLoad]=useState(false);
  const [show,setShow]=useState(false);
  const dispatch=useDispatch();
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
  const onSubmit = (data:any) => {
                setLoad(true);
                axios.post(`${import.meta.env.VITE_BACKEND}/api/user/login`,data,{
                  headers:{
                    'content-type':'application/json'
                  },
                  withCredentials:true
                })
                .then(res=>{
                  toast.success(res.data.message);
                  setLoad(false);
                  dispatch({type:'stateTrue'});
                  reset();
                })
                .catch(err=>{
                  console.log(err);
                  toast.error('Login failed- invalid credential');
                  setLoad(false);
                })
            }
  
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-left">
          <p className="">Enter your login credentials</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-1 mt-4">
            <label htmlFor="email">Email {errors.email && <span className='text-xs text-red-500'>email is required</span>}</label>
            <Input type="text" id="email" placeholder="MGgandhi@gmail.com" {...register("email", { required: true })}/>
          </div>
          <div className="grid w-full items-center gap-1 mt-3">
            <label htmlFor="email">Password {errors.password && <span className='text-xs text-red-500'>password is required</span>}</label>
            <div className="flex items-center border rounded-lg">
              <Input type={show?"text":"password"} className='border-0 focus-visible:ring-transparent' id="password" placeholder="your password" {...register("password",
              { required: true})}/>
              <i className={`mr-3 ${show?"bi-eye-slash":"bi bi-eye"} `} onClick={()=>setShow(!show)} ></i>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            {
            load?<Button disabled>Please wait...</Button>:<Button>Login</Button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}