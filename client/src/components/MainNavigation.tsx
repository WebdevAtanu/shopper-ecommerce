import {
  Menubar,
  MenubarMenu,
} from "@/components/ui/menubar"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import Account from '@/components/Account';
import {useSelector} from 'react-redux';


function MainNavigation() {
	const status=useSelector((state:any)=>state.loginReducer);
	const userData=useSelector((state:any)=>state.userReducer);
	return (
		<div className='bg-black flex justify-between items-center p-3 px-6'>
		<div className='flex justify-start'>
			<img src="logo.png" alt="" className='w-1/4'/>
		</div>
		<Menubar>
		{
			status.status?
			<MenubarMenu>
		<Dialog>
		  <DialogTrigger className='px-3 hover:bg-gray-200 rounded-lg'>{userData.data.name}</DialogTrigger>
		  <DialogContent>
		    <DialogHeader>
		      <DialogTitle>Account</DialogTitle>
		      <DialogDescription>
		      </DialogDescription>
		        <Account/>
		    </DialogHeader>
		  </DialogContent>
		</Dialog>
		  </MenubarMenu>
		  :
		  <>
		  <MenubarMenu>
		<Dialog>
		  <DialogTrigger className='px-3 hover:bg-gray-200 rounded-lg'>Login</DialogTrigger>
		  <DialogContent>
		    <DialogHeader>
		      <DialogTitle>Login</DialogTitle>
		      <DialogDescription>
		      </DialogDescription>
		        <LoginForm/>
		    </DialogHeader>
		  </DialogContent>
		</Dialog>
		  </MenubarMenu>

		  <MenubarMenu>
		  <Dialog>
			 <DialogTrigger className='px-3 hover:bg-gray-200 rounded-lg'>Signup</DialogTrigger>
			  <DialogContent>
			    <DialogHeader>
			      <DialogTitle>Create your account</DialogTitle>
			      <DialogDescription>
			      </DialogDescription>
			      <SignupForm/>
			    </DialogHeader>
			  </DialogContent>
			</Dialog>
		  </MenubarMenu>
		  </>
		}

			<MenubarMenu>
		      <Sheet>
      <SheetTrigger className='px-3 hover:bg-gray-200 rounded-lg'>Cart</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
          Description
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
		  </MenubarMenu>
		</Menubar>
		
		</div>
	)
}

export default MainNavigation