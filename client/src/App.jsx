import './App.css';
import Header from './component/Header';
import Products from './component/Products';
import Viewproduct from './component/Viewproduct';
import User from './component/User';
import Cart from './component/Cart';
import {Provider} from 'react-redux';
import Store from './redux/store/Store';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  
  
  return (
    <>
    <Provider store={Store}>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='view' element={<Viewproduct/>}/>
        <Route path='user' element={<User/>}/>
        <Route path='cart' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
