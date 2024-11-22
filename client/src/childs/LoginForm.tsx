import {useState,useEffect} from 'react';
import { useForm } from "react-hook-form";

import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/Label"

export default function LoginForm() {
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
    const onSubmit = data => {
                console.log(data);
                reset();
            }
  
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <p className="py-3">
            Enter your login credentials
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-1 mt-4">
            <Label htmlFor="email">Email {errors.email && <span className='text-sm text-red-500'> is required</span>}</Label>
            <Input type="text" id="email" placeholder="JohnDoe@gmail.com" {...register("email", { required: true })}/>
          </div>
          <div className="grid w-full items-center gap-1 mt-4">
            <Label htmlFor="email">Password {errors.password && <span className='text-sm text-red-500'> is required</span>}</Label>
            <Input type="text" id="password" placeholder="********" {...register("password", { required: true })}/>
            <p className="text-sm mt-1">Must contain 8+ characters, including at least 1 letter and 1 number.</p>
          </div>
          <div className="mt-6">
            <Button className='w-full'>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}