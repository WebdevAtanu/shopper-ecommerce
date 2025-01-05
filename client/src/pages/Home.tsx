import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import useGetUser from '@/service/getUser'
import Navigation from '@/components/common/Navigation';
import Banner from '@/components/common/Banner';
import Filter from '@/components/common/Filter';
import Products from '@/components/common/Products';
import Footer from '@/components/common/Footer';
import Menu from '@/components/common/Menu';

function Home() {
	const status=useSelector((state:any) =>state.loginReducer)
  const getUser=useGetUser();
  useEffect(()=>{
    getUser();
  },[status.status]);
	return (
		<>
    <Navigation/>
		<Banner/>
    <Filter/>
		<Products/>
    <Footer/>
    <Menu/>
		</>
	)
}

export default Home