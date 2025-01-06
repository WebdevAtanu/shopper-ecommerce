import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import DataTable from '@/components/admin/DataTable';
import AddProduct from '@/components/admin/AddProduct';
import {Columns} from '@/components/admin/Column';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"

function Admin() {
	const status=useSelector((state:any) =>state.adminReducer);
	const state=useSelector((state:any)=>state.dataTableReducer);
	const navigate=useNavigate();
	const [admin,setAdmin]=useState({ name: '', email: '' })
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
		},[state.current])

		useEffect(()=>{
			productDetails();
		},[menu])

		const menuHandler=(option:any)=>{
			setMenu(option);
		}

		const logoutHandler=()=>{
			axios.get(`${import.meta.env.VITE_BACKEND}/api/admin/logout`,{withCredentials:true})
			.then(res=>{
			console.log(res.data.message);
			navigate('/');
			toast.warning('logout not working? there is a problem on render server');
			})
		}

		return (
		<div className="flex flex-col">
		<div className='bg-slate-800 p-3 flex justify-between items-center'>
		<div className="flex gap-2 items-center bg-white px-2 py-1 rounded-lg">
			<Avatar>
				<AvatarImage src="avatar.png" />
				<AvatarFallback>A</AvatarFallback>
			</Avatar>
			<div>
			<h1 className='text-sm'>Admin- {admin?.name}</h1>
			</div>
		</div>
		<div>
			<Menubar>
			  <MenubarMenu>
			    <MenubarTrigger className='cursor-pointer'>Menu</MenubarTrigger>
			    <MenubarContent>
			      <MenubarItem className='flex gap-2 items-center' onClick={()=>menuHandler('table')}><i className="bi bi-table"></i> Data Table</MenubarItem>
			      <MenubarItem className='flex gap-2 items-center' onClick={()=>menuHandler('add')}><i className="bi bi-plus-circle"></i> Add Product</MenubarItem>
			      <MenubarItem className='flex gap-2 items-center' onClick={()=>menuHandler('chart')}><i className="bi bi-bar-chart"></i> Charts</MenubarItem>
			      <MenubarSeparator />
			      <MenubarItem className='flex gap-2 items-center' onClick={()=>menuHandler('social')}><i className="bi bi-wechat"></i> Social</MenubarItem>
			      <MenubarItem className='flex gap-2 items-center' onClick={()=>menuHandler('contact')}><i className="bi bi-person-rolodex"></i> Contact</MenubarItem>
			      <MenubarSeparator />
			      <MenubarItem className='flex gap-2 items-center text-red-600' onClick={logoutHandler}><i className="bi bi-power"></i> Logout</MenubarItem>
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
			menu=='add'?
			<AddProduct/>
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