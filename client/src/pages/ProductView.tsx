import {useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import ProductButton from '@/components/ProductButton';
import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"



function ProductView() {
	const location=useLocation();
	const data=location.state;
	useEffect(()=>{
		scrollTo(0,0);
	},[])
	return (
		<>
				<div className="p-3">
				<Breadcrumb>
		  <BreadcrumbList>
		    <BreadcrumbItem>
		      <Link to='/'>Home</Link>
		    </BreadcrumbItem>
		    <BreadcrumbSeparator />
		    <BreadcrumbItem>
		      <BreadcrumbPage>{data.title}</BreadcrumbPage>
		    </BreadcrumbItem>
		  </BreadcrumbList>
		</Breadcrumb>
		</div>

		<div className='grid md:grid-cols-2 p-3'>
		<div className="md:min-h-screen">
			<div className='flex flex-col gap-1 p-5'>
				<img src={data.image} alt="" className='w-1/2 m-auto mb-5'/>
				<p className='my-3 text-center'><span className='text-green-700'>Free delivery</span></p>
				<ProductButton/>
			</div>
			</div>
			<div>
			<div className="flex flex-col gap-2">
				<p className='text-2xl'>{data.title}</p>
				<p>Brand: {data.brand?data.brand:'Unknown'}</p>
				<p><i className="bi bi-currency-rupee"></i>{data.price} <span className='ml-2 text-green-500 text-sm'>{data.discount}% off</span></p>
				<p>Tag: {data.tag}</p>
				<p>Available stock: {data.stock} unit</p>
				<p>Description: {data.description}</p>
				</div>
			</div>
		</div>
		</>
	)
}

export default ProductView