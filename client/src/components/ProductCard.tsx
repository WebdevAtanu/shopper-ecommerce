import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function ProductCard(props:any) {
  return (
    <Card className='h-full group'>
    <div className="w-1/2 m-auto overflow-hidden mb-1">
      <img src={props.image} alt="Product" className='group-hover:scale-110 duration-150'/>
    </div>
    <CardHeader>
    <CardTitle>{props.title}</CardTitle>
    <CardDescription><p className='text-sm text-gray-700'>{props.description}...</p></CardDescription>
    </CardHeader>
    <CardContent>
    <p className='text-sm'>Brand- <span className='text-gray-700'>{props.brand}</span></p>
    <p className='text-sm bg-[#301073] inline-block p-[3px] text-white my-1'>Limited time Offer</p>
    <p>Price: <span><i className="bi bi-currency-rupee text-green-700"></i></span>{props.price} <span className='text-sm text-gray-500'>({props.discount}% off)</span></p>
    </CardContent>
    <CardFooter>

    </CardFooter>
    </Card>
  )
}

export default ProductCard