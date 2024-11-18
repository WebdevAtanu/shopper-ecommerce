import React,{useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import moment from 'moment';
import ProductButton from '@/childs/ProductButton';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
				<img src={data.images[0]} alt="" className='w-1/2 m-auto'/>
				<ProductButton/>
				<p className='text-center text-gray-500'>Don't worry we have {data.returnPolicy}</p>
			</div>
			</div>
			<div>
			<div className="flex flex-col gap-2">
				<p className='text-2xl'>{data.title}</p>
				<p><span className='bg-green-700 text-white inline-block px-1'>{data.rating} </span><span className='text-gray-500'> {Math.round(data.rating*1.2*50)} Ratings and {Math.round(data.rating*1.4*50)} Reviews</span></p>
				<p>Brand: {data.brand?data.brand:'Unknown'}</p>
				<p>Tags: {data.tags.join(', ')}</p>
				<p><i className="bi bi-currency-dollar"></i>{data.price} <span className='ml-2 text-green-500 text-sm'>{data.discountPercentage}% off</span></p>
				
				<p>Description: {data.description}</p>
				</div>
				<div>
					<p className='text-xl mt-3'>Customer reviews</p>
					{
						data.reviews.map((item,index)=>{
							return(
								<Accordion type="single" collapsible key={index}>
								  <AccordionItem value="item-1">
								    <AccordionTrigger>Review by {item.reviewerName}</AccordionTrigger>
								    <AccordionContent className='bg-gray-50 p-3'>
								      <p className='text-xl'>{item.comment}</p>
								      <p className='text-sm text-gray-500'>{moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
								    </AccordionContent>
								  </AccordionItem>
								</Accordion>
								)
						})
					}
				</div>
			</div>
		</div>
		</>
	)
}

export default ProductView