import {useState,useEffect} from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

function Cart() {
	const [carts,setCarts]=useState({});
	const [totalPrice,setTotalPrice]=useState(0);
	const [totalDiscount,setTotalDiscount]=useState(0);
	const userData=useSelector((state:any)=>state.userReducer);
	const status=useSelector((state:any)=>state.loginReducer);

	const cartDetails=async()=>{
		axios.get(`${import.meta.env.VITE_BACKEND}/api/cart/mycart`,{withCredentials:true})
	    .then(res=>{
	      	setCarts(res.data);
	      	const total = res.data.cart.reduce((acc:any, current:any) => {
    			return acc + current.price;
				}, 0); // Initial value of the accumulator is 0
			setTotalPrice(total);

			const discount = res.data.cart.reduce((acc:any, current:any) => {
    			return acc + ((current.price*100)/(current.price/(1-(current.discount/100))));
				}, 0); // Initial value of the accumulator is 0
			setTotalDiscount(discount);
	    })
	    .catch(err=>{
	      console.log(err.message);
	    })
		}
		useEffect(()=>{
			cartDetails();
		},[])
	return (
		<>
		{
		status.status?
		<div className='h-full overflow-auto p-3'>
			<p className='text-sm mb-5'>Deliver to: <span className='font-bold'>{userData.data.name}, {userData.data.address}</span></p>
			{
			(!carts?.cart)?
			<img src="nocart.png" alt=""/>
			:
			<>
			{
			(carts?.cart).map((item:any,i:any)=>{
			return(
			<div key={i} className='mb-6'>
				<Link to='/product' state={item}>
				<div className="flex items-start gap-3">
					<img src={item.image} alt="" className='w-1/6 border border-black rounded-lg p-1'/>
					<div className="">
						<p>{item.title}</p>
						<p className='text-xs text-gray-500'>{item.tag}</p>
						<p className='text-xs'>Brand: {item.brand}</p>
						<p className='text-xs'>{item.description.slice(0,40)}...</p>
						<p><span className='font-bold'><i className="bi bi-currency-rupee"></i>{item.price} </span>
						<span className='line-through text-gray-500'>{Math.round(item.price/(1-(item.discount/100)))}</span>
						<span className='text-green-700'><i className="bi bi-arrow-down"></i>{item.discount}%</span>
					</p>
				</div>
			</div>
		</Link>
		<div className="flex gap-1 mt-2">
			<Button variant='outline' className='w-full'><i className="bi bi-trash"></i>Remove</Button>
			<Button variant='outline' className='w-full'><i className="bi bi-lightning-charge"></i>Buy this</Button>
		</div>
		</div>
		)
		})
		}
		</>
		}
		<hr className="mb-2"/>
		<div className="mb-5">
		<p className='font-bold'>Price details</p>
		<div className='flex justify-between mt-1 mb-2'>
			<p>Price ({(carts?.cart).length} items)</p>
			<p><i className="bi bi-currency-rupee"></i>{totalPrice}</p>
		</div>
		<div className='flex justify-between mt-1 mb-2'>
			<p>Discount</p>
			<p className='text-green-700'><i className="bi bi-currency-rupee"></i>{totalDiscount}</p>
		</div>
		<div className='flex justify-between mt-1 mb-2'>
			<p>Delivery charge</p>
			<p><i className="bi bi-currency-rupee"></i>{(totalPrice*5)/100}</p>
		</div>
		<div className="flex items-center mt-3 justify-between">
			<p>Pay- {(totalPrice+((totalPrice*5)/100))}</p>
			<Button><i className="bi bi-lightning-charge"></i>Place order</Button>
		</div>
		</div>
		</div>
		:
		<div className="flex flex-col item-center justify-center">
		<p className='text-center'>User not logged in</p>
		<img src="nouser.png" alt=""/>
		</div>
		}
		</>
		
	)
}

export default Cart