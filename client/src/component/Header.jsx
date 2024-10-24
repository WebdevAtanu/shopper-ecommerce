import React from 'react';
import {NavLink} from 'react-router-dom';

function Header() {
	return (
		<div className='flex justify-between item-center p-2 shadow sticky top-0 bg-white z-50'>
		 	<div>logo</div>
			<ul className='flex gap-3'>
				<li><NavLink to='/' style={({isActive})=>({color:isActive?'#009688':'black'})}><p className='flex flex-col items-center'><i className="bi bi-shop"></i><span className='text-[0.7rem] md:text-sm'>HOME</span></p></NavLink></li>
				<li><NavLink to='/user' style={({isActive})=>({color:isActive?'#009688':'black'})}><p className='flex flex-col items-center'><i className="bi bi-person-gear"></i><span className='text-[0.7rem] md:text-sm'>USER</span></p></NavLink></li>
				<li><NavLink to='/cart' style={({isActive})=>({color:isActive?'#009688':'black'})}><p className='flex flex-col items-center'><i className="bi bi-basket"></i><span className='text-[0.7rem] md:text-sm'>CART</span></p></NavLink></li>
			</ul>
		</div>
	)
}

export default Header