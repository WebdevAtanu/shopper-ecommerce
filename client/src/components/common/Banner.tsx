// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

function Banner() {
	let banner=[
	{
		image:'banner/b1.jpg'
	},
	{
		image:'banner/b2.jpg'
	},
	{
		image:'banner/b3.jpg'
	},
	{
		image:'banner/b4.jpg'
	},
	{
		image:'banner/b5.jpg'
	},
	]
	return (
		<div className='h-1/2'>
			<Splide aria-label="My Favorite Images" options={
				{
					type:'loop',
					autoplay:true,
					interval:5000,
					arrows:false,
					height:'250px',
			}}>
			{
				banner.map((item,i)=>{
					return(
					<SplideSlide key={i}>
    				<img src={item.image} alt="Image" className='h-full w-full object-fill'/>
  					</SplideSlide>
					)
				})
			}
			</Splide>
		</div>
	)
}

export default Banner