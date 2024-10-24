import React,{useState} from 'react';
import Sideebar from './Sidebar';
import { Sling as Hamburger } from 'hamburger-react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

function Menu() {
	const[flag,setFlag]=useState(false);
	const[word,setWord]=useState();
	const dispatch=useDispatch();
	const searcher=()=>{
		if(word==null || word==''){
			toast.error('Empty search', {
			position: "top-center",
			autoClose: 500,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			})
		}
		else{
		dispatch({type:'searchWord',payload:word.toLowerCase()})
		}
	}
	return (
		<>
			<div className={`fixed z-10 bg-white border border-r-black h-full duration-300 ${flag?'left-0 duration-300':'-left-[300px] duration-300'}`}>
			<div className="flex justify-end p-3">
			</div>
			<Sideebar/>
			</div>
		
		<div className='bg-gray-100 p-2'>
			<div className='flex w-full justify-center items-center'>
				<input type="text" placeholder='Search product' className='p-2 border border-black border-r-0 w-1/2 outline-0' onChange={(e)=>setWord(e.target.value)}/>
				<button className='border-black border py-2 px-3 border-l-0 bg-white' onClick={searcher}><i className="bi bi-search"></i></button>
			<Hamburger toggled={flag} toggle={setFlag} size={25} duration={0.5}/>
			</div>
		</div>
		</>
	)
}

export default Menu