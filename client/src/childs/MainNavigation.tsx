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



function MainNavigation() {
	return (
		<div className='bg-slate-900 flex justify-between items-center p-3 px-6'>
		<Menubar>
		  <MenubarMenu>
		<Dialog>
		  <DialogTrigger className='px-3 hover:bg-gray-200 rounded-lg'>Login</DialogTrigger>
		  <DialogContent>
		    <DialogHeader>
		      <DialogTitle>Login</DialogTitle>
		      <DialogDescription>
		        form
		      </DialogDescription>
		    </DialogHeader>
		  </DialogContent>
		</Dialog>
		  </MenubarMenu>

		  <MenubarMenu>
		  <Dialog>
			 <DialogTrigger className='px-3 hover:bg-gray-200 rounded-lg'>Signup</DialogTrigger>
			  <DialogContent>
			    <DialogHeader>
			      <DialogTitle>Signup</DialogTitle>
			      <DialogDescription>
			        form
			      </DialogDescription>
			    </DialogHeader>
			  </DialogContent>
			</Dialog>
		  </MenubarMenu>

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
		<div>Logo</div>
		</div>
	)
}

export default MainNavigation