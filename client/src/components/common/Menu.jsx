import React from 'react'
import Cart from '@/components/user/Cart';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function Menu() {
	return (
		<div className='fixed bottom-0 px-2 bg-white w-full border-t '>
			<div className="w-full md:w-1/4 md:m-auto flex justify-between">
				<div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2">
					<i className="bi bi-house-door-fill"></i>
					<p className='text-xs'>Home</p>
				</div>
				<div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2">
					<i className="bi bi-heart-fill"></i>
					<p className='text-xs'>Favorites</p>
				</div>
				<div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2">
					<i className="bi bi-bell-fill"></i>
					<p className='text-xs'>Notifications</p>
				</div>
				<Sheet>
				<SheetTrigger className='flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2'>
				<i className="bi bi-basket3-fill"></i>
				<p className='text-xs'>My cart</p>
				</SheetTrigger>
				<SheetContent>
				<SheetHeader>
				<SheetTitle>My cart</SheetTitle>
				<SheetDescription>
				</SheetDescription>
				</SheetHeader>
				<Cart/>
				</SheetContent>
				</Sheet>
			</div>
		</div>
	)
}

export default Menu