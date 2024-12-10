import {useState} from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast } from "sonner"

function Buttons({data}:any) {
	const [load,setLoad]=useState(false);
	const addToCart = () => {
		setLoad(true);
                axios.post(`${import.meta.env.VITE_BACKEND}/api/cart/add`,{data:data},{
                  headers:{
                    'content-type':'application/json'
                  },
                  withCredentials:true
                })
                .then(res=>{
                  console.log(res);
                  toast.success("Cart has been added", {
                  description: data.title,
                  });
                  setLoad(false);
                })
                .catch(err=>{
                  console.log(err.message);
                })
            }

	return (
		<div className='px-3 flex justify-between gap-2'>
		<Button variant="outline" className="w-full p-0" onClick={addToCart} disabled={load} aria-busy={load} aria-live="polite">{load ? "Please wait..." : "Add to cart"}</Button>
			<Button className='w-full p-0' onClick={()=>console.log(data)}>Buy now</Button>
		</div>
	)
}

export default Buttons