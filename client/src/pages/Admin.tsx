import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import DataTable from '@/components/admin/DataTable';
import {Columns} from '@/components/admin/Column';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"

function Admin() {
	const status=useSelector((state:any) =>state.adminReducer)
	const navigate=useNavigate();
	const [admin,setAdmin]=useState({})
	const [product,setProduct]=useState([])
	const [menu,setMenu]=useState('table');
	if(status.status==false){
		useEffect(()=>{
			navigate('/');
		},[])	
	}
	else{
		const adminDetails=async()=>{
		axios.get(`${import.meta.env.VITE_BACKEND}/api/admin/details`,{withCredentials:true})
	    .then(res=>{
	      setAdmin(res.data);
	    })
	    .catch(err=>{
	      console.log(err.message);
	    })
		}

		const productDetails=async()=>{
		axios.get(`${import.meta.env.VITE_BACKEND}/api/product/products`)
	    .then(res=>{
	      setProduct(res.data.data);
	    })
	    .catch(err=>{
	      console.log(err.message);
	    })
		}

		useEffect(()=>{
			adminDetails();
			productDetails();
		},[])

		const menuHandler=(option:any)=>{
			setMenu(option);
		}

		return (
		<div className="flex flex-col">
		<div className='bg-slate-800 p-3 flex justify-between items-center'>
		<div className="flex gap-2 items-center bg-white p-2 rounded-lg">
			<Avatar>
				<AvatarImage src="avatar.png" />
				<AvatarFallback>A</AvatarFallback>
			</Avatar>
			<div>
			<h1 className='text-xl'>{admin?.name}</h1>
			<p className='text-sm'>{admin?.email}</p>
			</div>
		</div>
		<div>
			<Menubar>
			  <MenubarMenu>
			    <MenubarTrigger>Menu</MenubarTrigger>
			    <MenubarContent>
			      <MenubarItem onClick={()=>menuHandler('table')}>Table</MenubarItem>
			      <MenubarItem onClick={()=>menuHandler('chart')}>Charts</MenubarItem>
			      <MenubarItem onClick={()=>menuHandler('notification')}>Notifications</MenubarItem>
			      <MenubarSeparator />
			      <MenubarItem onClick={()=>menuHandler('social')}>Social</MenubarItem>
			      <MenubarItem onClick={()=>menuHandler('contact')}>Contact</MenubarItem>
			    </MenubarContent>
			  </MenubarMenu>
			</Menubar>
		</div>	
		</div>
		<div className="p-3">
		{
			menu=='table'?
			<DataTable columns={Columns} data={product}/>
			:
			menu=='chart'?
			<h1>chart</h1>
			:
			menu=='notification'?
			<h1>notification</h1>
			:
			menu=='social'?
			<h1>social</h1>
			:
			menu=='contact'?
			<h1>contact</h1>
			:
			<h1>Something went wrong</h1>
		}
		</div>
		</div>
	)
	}
	
}

export default Admin