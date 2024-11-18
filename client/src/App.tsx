import { useState } from 'react'
import './App.css'
import MainNavigation from "@/childs/MainNavigation"
import Products from "@/pages/Products";
import ProductView from "@/pages/ProductView";
import {Provider} from 'react-redux';
import Store from '@/redux/store/Store';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {

  return (
    <>
      <Provider store={Store}>
    <BrowserRouter>
    <MainNavigation/>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/product' element={<ProductView/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
