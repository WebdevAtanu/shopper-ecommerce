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
		text:'Monday, Grab some deals'
	},
	{
		image:'product/2.jpg',
		text:'Tuesday, Shoes and heels'
	},
	{
		image:'product/3.jpg',
		text:'Wednesday, Shop with glee'
	},
	{
		image:'product/4.jpg',
		text:'Thursday, Fruits and tea'
	},
	{
		image:'product/5.jpg',
		text:'Friday, Gifts and toys'
	},
	{
		image:'product/6.jpg',
		text:'Saturday, Joyful noise'
	},
	{
		image:'product/7.jpg',
		text:'Sunday, Rest, no spree'
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
		<div className='h-1/2 py-2 bg-yellow-300'>
			<Splide aria-label="My Favorite Images" options={
				{
					type:'loop',
					pagination:false,
					perPage:4,
					arrows:false,
					height:'180px',
					gap:'10px',
					focus:"center",
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
    					<img src={item.image} alt="Image" className='h-full w-full object-fill rounded-xl'/>
						<div className="absolute bottom-0 bg-black text-white w-full p-2 rounded-b-xl">
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