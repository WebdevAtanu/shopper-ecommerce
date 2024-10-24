import React,{useState} from 'react';
import SignupForm from'./childs/SignupForm';
import LoginForm from'./childs/LoginForm';

function User() {
		const[flag,setFlag]=useState(true);
	return (
		<div className="grid md:grid-cols-2">
		<div className='flex flex-col justify-center items-center p-5'>
			{
				flag?<LoginForm/>:<SignupForm/>
			}
			{
				flag?
			<p className='mt-3'>Don't have an account? <button onClick={()=>setFlag(!flag)} className='text-blue-500 hover:text-blue-600 duration-150 text-center'>Register Now</button></p>
			:<p className='mt-3'>Already have an account? <button onClick={()=>setFlag(!flag)} className='text-blue-500 hover:text-blue-600 duration-150 text-center'>Login Now</button></p>
			}
		</div>
		<div>
			<img src="user.jpg" alt=""/>
		</div>
		</div>
	
	)
}

export default User