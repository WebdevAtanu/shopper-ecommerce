import {useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import Buttons from '@/components/common/Buttons';
import { Link } from 'react-router-dom';
import Navigation from '@/components/common/Navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table"

function ProductView() {
	const location=useLocation();
	const data=location.state;
	useEffect(()=>{
		scrollTo(0,0);
	},[])
	return (
		<>
		<Navigation/>
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
					<img src={data.image} alt="image" className='w-1/2 m-auto mb-3'/>
					<p className='my-3 text-center'><span className='text-green-700'>Free delivery available on this product</span></p>
					<Buttons data={data}/>
					</div>
				</div>

				<div>
				<Table>
				<TableCaption>Product details</TableCaption>
				<TableBody>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>{data.title}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell>Price</TableCell>
						<TableCell><i className="bi bi-currency-rupee"></i>{data.price}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell>Discount</TableCell>
						<TableCell className='ml-2 text-green-500 text-sm'>{data.discount}% off</TableCell>
				</TableRow>
				<TableRow>
						<TableCell>Available stock</TableCell>
						<TableCell>{data.stock}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell>Category</TableCell>
						<TableCell>{data.category}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell>Brand</TableCell>
						<TableCell>{data.brand}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell>Tag</TableCell>
						<TableCell>{data.tag}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell>Description</TableCell>
						<TableCell>{data.description}</TableCell>
				</TableRow>
				</TableBody>
				</Table>
				</div>
			</div>
		</>
	)
}

export default ProductView