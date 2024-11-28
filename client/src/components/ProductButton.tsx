import { Button } from "@/components/ui/button"

function ProductButton() {
	return (
		<div className='px-3 flex justify-between gap-2'>
			<Button variant="outline" className='w-full p-0'>Add to cart</Button>
			<Button className='w-full p-0'>Buy now</Button>
		</div>
	)
}

export default ProductButton