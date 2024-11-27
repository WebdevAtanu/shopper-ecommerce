import {useEffect} from 'react';
import './App.css'
import MainNavigation from "@/childs/MainNavigation"
import Home from "@/pages/Home";
import ProductView from "@/pages/ProductView";
import {Provider} from 'react-redux';
import Store from '@/redux/store/Store';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Provider store={Store}>
    <BrowserRouter>
    <MainNavigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<ProductView/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
    <Toaster />
    </>
  )
}

export default App
