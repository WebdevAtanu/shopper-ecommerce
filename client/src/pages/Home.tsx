import {useEffect} from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import Sidebar from '@/components/Sidebar';
import BannerSlider from '@/components/BannerSlider';
import Products from '@/components/Products';

function Home() {
	const status=useSelector((state:any) =>state.loginReducer)
	const dispatch=useDispatch();
  	const getUser=async()=>{
    axios.get(`${import.meta.env.VITE_BACKEND}/api/user/details`,{withCredentials:true})
    .then(res=>{
      dispatch({type:'userData',payload:res.data});
      dispatch({type:'stateTrue'});
    })
    .catch(err=>{
      console.log(err.message);
    })
  }
  useEffect(()=>{
    getUser();
  },[status.status]);
	return (
		<>
		<BannerSlider/>
    	<Sidebar/>
		<Products/>
		</>
	)
}

export default Home