// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Banner() {
	let banner=[
	{
		image:'banner/b1.jpg',
		text:'Your Shopping, Simplified – Click, Browse, Smile!'
	},
	{
		image:'banner/b2.jpg',
		text:'Discover Deals, Embrace Savings – Shop With Us!'
	},
	{
		image:'banner/b3.jpg',
		text:'Because Every Cart Deserves Happiness!'
	},
	{
		image:'banner/b4.jpg',
		text:'Unbeatable Prices, Unmatched Selection!'
	},
	{
		image:'banner/b5.jpg',
		text:'Find What You Love, Love What You Find!'
	},
	]

	let items=[
	{
		image:'product/1.jpg',
		text:'Get it now'
	},
	{
		image:'product/2.jpg',
		text:'Starting from 99'
	},
	{
		image:'product/3.jpg',
		text:'Min 30% off'
	},
	{
		image:'product/4.jpg',
		text:'Shop now'
	},
	]
	return (
		<>
		<div className='h-1/2'>
			<Splide aria-label="My Favorite Images" options={
				{
					type:'loop',
					autoplay:true,
					interval:5000,
					arrows:false,
					height:'250px',
					pagination:false,
			}}>
			{
				banner.map((item,i)=>{
					return(
					<SplideSlide key={i}>
					<div className='h-full w-full relative'>
    					<img src={item.image} alt="Image" className='h-full w-full object-fill'/>
						<div className="absolute bottom-0 bg-black text-white w-full p-2">
							<p className='text-sm'>{item.text}</p>
						</div>
					</div>
  					</SplideSlide>
					)
				})
			}
			</Splide>
		</div>
		<div className='h-1/2 p-3 m-3 bg-yellow-200 rounded-lg'>
		<p className='text-xm mb-3 font-bold'>Friday street bargains</p>
			<Splide aria-label="My Favorite Images" options={
				{
					type:'loop',
					pagination:false,
					 perPage:8,
					arrows:false,
					height:'150px',
					gap:'15px',
					breakpoints:{
						768:{
							perPage:2,
						},
					}
			}}>
			{
				items.map((item,i)=>{
					return(
					<SplideSlide key={i}>
					<div className='h-full w-full relative'>
    					<img src={item.image} alt="Image" className='h-full w-full object-fill'/>
						<div className="absolute bottom-0 bg-black text-white w-full p-2">
							<p className='text-xs'>{item.text}</p>
						</div>
					</div>
  					</SplideSlide>
					)
				})
			}
			</Splide>
		</div>
	</>
	)
}

export default Banner