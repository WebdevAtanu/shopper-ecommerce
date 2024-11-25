import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupForm() {
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
    const onSubmit = (data:any) => {
                console.log(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="email">Name {errors.name && <span className='text-sm text-red-500'> is required</span>}</label>
            <Input type="text" id="name" placeholder="John Doe" {...register("name", { required: true })}/>
          </div>
          <div className="grid w-full items-center gap-1 mt-4">
            <label htmlFor="email">Email {errors.email && <span className='text-sm text-red-500'> is required</span>}</label>
            <Input type="text" id="email" placeholder="JohnDoe@gmail.com" {...register("email", { required: true })}/>
          </div>
          <div className="grid w-full items-center gap-1 mt-4">
            <label htmlFor="email">Password {errors.password && <span className='text-sm text-red-500'> is required</span>}</label>
            <Input type="text" id="password" placeholder="********" {...register("password", { required: true })}/>
            <p className="text-sm mt-1">Must contain 8+ characters, including at least 1 letter and 1 number.</p>
          </div>
          <div className="mt-6">
            <Button className='w-full'>Signup</Button>
          </div>
        </form>
      </div>
    </div>
  );
}