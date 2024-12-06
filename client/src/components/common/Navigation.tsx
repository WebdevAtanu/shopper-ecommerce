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

import LoginForm from '@/components/user/UserLogin';
import SignupForm from '@/components/user/UserSignup';
import Account from '@/components/user/UserAccount';
import Cart from '@/components/user/Cart';
import {useSelector} from 'react-redux';


function Navigation() {
	const status=useSelector((state:any)=>state.loginReducer);
	const userData=useSelector((state:any)=>state.userReducer);
	return (
		<div className='bg-black flex justify-between items-center p-3 px-6'>
		<div className='flex justify-start w-1/4'>
			<img src="logo.png" alt="" className='w-full md:w-1/4'/>
		</div>
		<Menubar>
		{
			status.status?
			<MenubarMenu>
		<Dialog>
		  <DialogTrigger className='px-3 hover:bg-gray-200 rounded-lg flex items-center gap-1'><i className="bi bi-person-circle"></i> <span>{userData.data.name}</span></DialogTrigger>
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
		      <DialogTitle>User login</DialogTitle>
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
			      <DialogTitle>Account registration</DialogTitle>
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
      <SheetTrigger className='px-3 hover:bg-gray-200 rounded-lg flex items-center'><i className="bi bi-cart3"></i> <span>cart</span></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My cart</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <Cart/>
      </SheetContent>
    </Sheet>
		  </MenubarMenu>
		</Menubar>
		</div>
	)
}

export default Navigation