import { Button } from "@/components/ui/button"

function ProductButton() {
	return (
		<div className='px-3 flex justify-between gap-2'>
			<Button variant="outline" className='w-full'>Add to cart</Button>
			<Button className='w-full'>Buy now</Button>
		</div>
	)
}

export default ProductButton