import {useState} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useDispatch,useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useForm } from "react-hook-form";

function UserAccount() {
	const dispatch=useDispatch();
	const userData=useSelector((state:any)=>state.userReducer);
	const [flag,setFlag]=useState(false);
	const [load,setLoad]=useState(false);
	 const { register, handleSubmit,reset,formState: { errors } } = useForm({
    defaultValues:{
    	id:userData.data.id,
    	name:userData.data.name,
    	email:userData.data.email,
    	phone:userData.data.phone,
    	address:userData.data.address,
    }
  });

// ====================================user edit handler================================================
	const updateHandler=(updateData:any)=>{
		setLoad(true);
                axios.post(`${import.meta.env.VITE_BACKEND}/api/user/update`,{id:userData.data.id,...updateData})
                .then(res=>{
                  toast.success(res.data.message);
                  setLoad(false);
                  reset({
                    name:updateData.name,
                    phone:updateData.phone,
                    address:updateData.address
                  });
                  dispatch({ type: 'userData', payload: {id:userData.data.id,...updateData} });
                  setFlag(false)
                })
                .catch(err=>{
                  console.log(err);
                  setLoad(false);
                }) 
	}
	
// ====================================user logout handler================================================
	const logoutHandler=()=>{
		axios.get(`${import.meta.env.VITE_BACKEND}/api/user/logout`,{withCredentials:true})
		.then(res=>{
			dispatch({type:'stateFalse'});
			console.log(res.data.message);
			toast.warning('logout not working? there is a problem on render server');
	})
	}

	return (
		<>
		<div className="flex justify-between items-center">
			<div className='flex gap-2 items-center'>
				<Avatar>
				<AvatarImage src="avatar.png" />
				<AvatarFallback>A</AvatarFallback>
			</Avatar>
			<p>{userData.data.name}</p>
			</div>
			<Button variant="destructive" onClick={logoutHandler}>logout</Button>
		</div>
		{
			flag?
			<div className="border border-black p-3">
				<form onSubmit={handleSubmit(updateHandler)}>
				<div className="grid grid-cols-2 gap-2">
					<div className="grid w-full items-center gap-1">
						<label htmlFor="name">name {errors.name && <span className='text-sm text-red-500'>{typeof errors.name.message === 'string' ? errors.name.message : 'Invalid'}</span>}</label>
						<Input type="text" id="name" {...register("name",
						{ required:'is required'})}/>
					</div>
					<div className="grid w-full items-center gap-1 hidden">
						<label htmlFor="email">email {errors.email && <span className='text-sm text-red-500'>{typeof errors.email.message === 'string' ? errors.email.message : 'Invalid'}</span>}</label>
						<Input type="text" id="email" {...register("email",
						{ required:'is required'})}/>
					</div>
					<div className="grid w-full items-center gap-1">
						<label htmlFor="phone">phone {errors.phone && <span className='text-sm text-red-500'>{typeof errors.phone.message === 'string' ? errors.phone.message : 'Invalid'}</span>}</label>
						<Input type="text" id="phone" {...register("phone",
						{ required:'is required'})}/>
					</div>
					<div className="grid w-full items-center gap-1 col-span-2">
						<label htmlFor="address">address {errors.address && <span className='text-sm text-red-500'>{typeof errors.address.message === 'string' ? errors.address.message : 'Invalid'}</span>}</label>
						<Textarea id="address" className='resize-none' {...register("address",
            			{ required: 'is required'})}/>
					</div>
				</div>
					<div className="mt-6 flex gap-3">
						<Button className="w-full" variant='outline' onClick={()=>setFlag(false)}>Cancel</Button>
						<Button className="w-full" disabled={load} aria-busy={load} aria-live="polite">{load ? "Please wait..." : "Save Changes"}</Button>
					</div>
				</form>
			</div>
			:
		<div className='flex justify-between border border-black p-2 rounded-lg'>
		<div className=""> 
			<p><i className="bi bi-envelope-at"></i> {userData.data.email}</p>
			<p><i className="bi bi-telephone"></i> {userData.data.phone}</p>
			<p><i className="bi bi-geo-alt"></i> {userData.data.address}</p>
		</div>
		<i className="bi bi-pencil-square cursor-pointer hover:text-orange-700 scale-110" onClick={()=>setFlag(true)}></i>
		</div>
		}
		<div className='grid grid-cols-2 gap-2'>
			<p className='border border-black p-1 rounded-lg cursor-pointer hover:bg-blue-600 hover:text-white'><i className="bi bi-box-seam"></i> Orders</p>
			<p className='border border-black p-1 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white'><i className="bi bi-bag-heart"></i> Wishlist</p>
			<p className='border border-black p-1 rounded-lg cursor-pointer hover:bg-yellow-600 hover:text-white'><i className="bi bi-gift"></i> Coupons</p>
			<p className='border border-black p-1 rounded-lg cursor-pointer hover:bg-green-600 hover:text-white'><i className="bi bi-headset"></i> Help</p>
		</div> 
		</>
	)
}

export default UserAccount