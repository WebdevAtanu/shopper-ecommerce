import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import {NavLink} from 'react-router-dom';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

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
		    <NavLink to='/' style={({isActive})=>({color:isActive?'skyblue':'black'})}><MenubarTrigger className='cursor-pointer'>Home</MenubarTrigger></NavLink>
		  </MenubarMenu>

		  <MenubarMenu>
		<Dialog>
		  <DialogTrigger><MenubarTrigger className='cursor-pointer'>Login</MenubarTrigger></DialogTrigger>
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
			 <DialogTrigger><MenubarTrigger className='cursor-pointer'>Signup</MenubarTrigger></DialogTrigger>
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
      <SheetTrigger><MenubarTrigger className='cursor-pointer'>Cart</MenubarTrigger></SheetTrigger>
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