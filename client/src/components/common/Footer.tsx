import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import AdminLogin from '@/components/admin/AdminLogin';

function Footer() {
	return (
		<div className='bg-slate-900 text-white mb-16'>
		<footer className="grid grid-cols-3 gap-3 p-5 mt-5">
			<div className='flex flex-col'>
				<p className='cursor-pointer hover:underline underline-offset-4'>Branding</p>
				<p className='cursor-pointer hover:underline underline-offset-4'>Design</p>
				<p className='cursor-pointer hover:underline underline-offset-4'>Marketing</p>
			</div>
			<div className='flex flex-col'>
				<p className='cursor-pointer hover:underline underline-offset-4'>Company</p>
				<p className='cursor-pointer hover:underline underline-offset-4'>Advertisement</p>
				<p className='cursor-pointer hover:underline underline-offset-4'>About us</p>
			</div>
			<div className='flex flex-col'>
				<p className='cursor-pointer hover:underline underline-offset-4'>Terms of use</p>
				<p className='cursor-pointer hover:underline underline-offset-4'>Privacy policy</p>
				<p className='cursor-pointer hover:underline underline-offset-4'>Join us</p>
			</div>
		</footer>
		<p className='text-center'>copyright © 2024, all rights reserved</p>

		<div className="flex justify-center">
		<Dialog>
		  <DialogTrigger className='text-sm text-blue-500 underline underline-offset-2'>Admin login</DialogTrigger>
		  <DialogContent>
		    <DialogHeader>
		      <DialogTitle >Admin login</DialogTitle>
		      <DialogDescription>
		      </DialogDescription>
		        <AdminLogin/>
		    </DialogHeader>
		  </DialogContent>
		</Dialog>
		</div>
		</div>
	)
}

export default Footer