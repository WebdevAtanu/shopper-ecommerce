import './App.css'
import MainNavigation from "@/components/MainNavigation"
import Home from "@/pages/Home";
import ProductView from "@/pages/ProductView";
import Admin from "@/pages/Admin";
import {Provider} from 'react-redux';
import Store from '@/redux/store/Store';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Provider store={Store}>
    <BrowserRouter>
    <h1 className='text-center p-1 bg-red-200'>Initial loading is slow because of free render hosting</h1>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<ProductView/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
    <Toaster />
    </>
  )
}

export default App
