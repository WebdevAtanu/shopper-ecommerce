import React from 'react';
import {useLocation} from 'react-router-dom';
import moment from 'moment';

function Viewproduct() {
	const location=useLocation();
	const data=location.state;
	return (
		<div className='grid md:grid-cols-2 p-3'>
			<div className='flex flex-col gap-1 p-5'>
				<img src={data.images[0]} alt="" className='w-1/2 m-auto'/>
				<div className="flex justify-evenly gap-2">
					<button className='bg-yellow-600 p-3 w-full text-white'>ADD TO CART</button>
					<button className='bg-orange-600 p-3 w-full text-white'>BUY NOW</button>
				</div>
				<p className='text-center text-gray-500'>Don't worry we have {data.returnPolicy}</p>
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
					<p className='text-xl mt-3'>Ratings & Reviews</p>
					{
						data.reviews.map((item,index)=>{
							return(
								<div className='bg-gray-50 p-2 mt-3' key={index}>
									<div className="flex gap-2 mb-3 items-center">
								 	<p className='bg-blue-700 text-white inline-block px-1 text-sm'>{item.rating} <i className="bi bi-star-fill"></i></p>
									<p className='text-xl'>{item.comment}</p>
									</div>
									<div className="flex justify-between">
									<p>Review by {item.reviewerName}</p>
									<p className='text-sm text-gray-500'>{moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
									</div>
								</div>
								)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default Viewproduct