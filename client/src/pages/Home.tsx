import {useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Sidebar from '@/childs/Sidebar';
import BannerSlider from '@/childs/BannerSlider';
import Products from '@/pages/Products';
import {useDispatch} from 'react-redux';

function Home() {
	const status=useSelector((state:any) =>state.loginReducer)
	const userData=useSelector((state:any) =>state.userReducer)
	const dispatch=useDispatch();
  	const getUser=async()=>{
    axios.get(`${import.meta.env.VITE_BACKEND}/api/user/details`,{withCredentials:true})
    .then(res=>{
      console.log(res.data);
      dispatch({type:'userData',payload:res.data.data});
    })
    .catch(err=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    console.log(status)
    console.log(userData)
    getUser();
  },[status]);
	return (
		<>
		<BannerSlider/>
    	<Sidebar/>
		<Products/>
		</>
	)
}

export default Home