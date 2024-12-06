import { Button } from "@/components/ui/button"

function Buttons({data}:any) {
	return (
		<div className='px-3 flex justify-between gap-2'>
			<Button variant="outline" className='w-full p-0' onClick={()=>console.log(data)}>Add to cart</Button>
			<Button className='w-full p-0' onClick={()=>console.log(data)}>Buy now</Button>
		</div>
	)
}

export default Buttons