import axios from 'axios';
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function UserAccount() {
	const dispatch=useDispatch();
	const userData=useSelector((state:any)=>state.userReducer);

// ====================================user edit handler================================================
	const userEditor=()=>{
		toast('update will be added soon');
	}
	
// ====================================user logout handler================================================
	const logoutHandler=()=>{
		axios.get(`${import.meta.env.VITE_BACKEND}/api/user/logout`,{withCredentials:true})
		.then(res=>{
			dispatch({type:'stateFalse'});
			console.log(res.data.message);
			toast('logout not working? there is a problem on render server');
	})
	}

	return (
		<>
		<div className="flex justify-between items-center">
			<div className='flex items-center'>
				<Avatar>
				<AvatarImage src="avatar.png" />
				<AvatarFallback>A</AvatarFallback>
			</Avatar>
			<p>{userData.data.name.toUpperCase()}</p>
			</div>
			<Button variant="destructive" onClick={logoutHandler}>logout</Button>
		</div>
		<div className='flex justify-between border border-black p-2 rounded-lg'>
		<div className=""> 
			<p><i className="bi bi-envelope-at"></i> {userData.data.email}</p>
			<p><i className="bi bi-telephone"></i> {userData.data.phone}</p>
			<p><i className="bi bi-geo-alt"></i> {userData.data.address}</p>
		</div>
		<i className="bi bi-pencil-square cursor-pointer hover:text-orange-700 scale-110" onClick={userEditor}></i>
		</div>
		<div className='grid grid-cols-2 gap-2'>
			<p className='border border-black p-1 rounded-lg cursor-pointer hover:bg-gray-100 hover:bg-blue-500'><i className="bi bi-box-seam"></i> Orders</p>
			<p className='border border-black p-1 rounded-lg cursor-pointer hover:bg-gray-100 hover:bg-red-500'><i className="bi bi-bag-heart"></i> Wishlist</p>
			<p className='border border-black p-1 rounded-lg cursor-pointer hover:bg-gray-100 hover:bg-yellow-500'><i className="bi bi-gift"></i> Coupons</p>
			<p className='border border-black p-1 rounded-lg cursor-pointer hover:bg-gray-100 hover:bg-green-500'><i className="bi bi-headset"></i> Help</p>
		</div> 
		</>
	)
}

export default UserAccount