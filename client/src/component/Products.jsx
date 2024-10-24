import { useState, useEffect, lazy, Suspense } from 'react';
import fetchData from '../api_data/fetchData';
const Card = lazy(()=>import('./childs/Card'));
import Button from './childs/Button';
import Menu from './Menu';
import { useSelector,useDispatch } from 'react-redux';
import Skeleton from './Skeleton';
import {Link} from 'react-router-dom';


// Function for getting the return values from fetchData.js
async function dataFetch(setGroupProduct,setAllProduct) {
  try {
    const { groupedData, allData} = await fetchData();
    setGroupProduct(groupedData);
    setAllProduct(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function Products() {
  const [groupProduct, setGroupProduct] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selected, setSelected] = useState('');
  const [searchProduct, setSearchProduct] = useState([]);
  const [flag, setFlag] = useState(true);
  const [page, setPage] = useState(0);
  const option = useSelector(state => state.categoryReducer);
  const word=useSelector(state=>state.searchReducer)
  const dispatch=useDispatch();

    useEffect(() => {
        dataFetch(setGroupProduct, setAllProduct);
        window.addEventListener('scroll',handleScroll);
        return()=>removeEventListener('scroll',handleScroll);
    }, []);

  //handle scroll==================================
    const handleScroll = () => {
        let height = document.documentElement.scrollHeight;
        let inner = window.innerHeight;
        let top = document.documentElement.scrollTop;
            if (top + inner + 1 >= height) {
                console.log('touch');
                setPage(page+1);
            }
    }

  //handle category==================================
    useEffect(() => {
        if (option.category != 'all') {
            setSelected(option.category);
            setFlag(true);
        } else {
            setFlag(false);
        }
    }, [option]);

  //handle search==================================
    useEffect(() => {
        let filteredProduct = allProduct.filter(item => item.title.toLowerCase().includes(word.search));
        setSearchProduct(filteredProduct);
        if (searchProduct.length != 0) {
            setFlag(null);
        }
    }, [word]);
  
    const renderProducts = (items) => items.map((item) => (
    <div key={item.id} className='border border-gray-400 p-3 flex flex-col justify-between bg-white'>
      <Link to='/view' state={item}>
      <Suspense fallback={<Skeleton/>}>
      <Card
      thumbnail={item.thumbnail}
      title={item.title}
      description={item.description.slice(0, 50)}
      brand={item.brand}
      price={item.price}
      rating={item.rating}
      discount={item.discountPercentage}
      />
      </Suspense>
    </Link>
    <div className="flex flex-col gap-1 justify-between mt-3">
      <Button text='add to cart' class='bg-gray-200 hover:bg-gray-300'/>
      <Button text='buy now' class='bg-yellow-400 hover:bg-yellow-500'/>
    </div>
    </div>
    ));

    return (
    <>
    {
    (allProduct.length!=0)?
    <div>
      <Menu/>
      <div className='grid gap-2'>
        <div className='col-span-4'>
          <div className="p-2 grid grid-cols-2 md:grid-cols-5 gap-1 bg-gray-100">
            {
            flag==true ? renderProducts(groupProduct[selected] || []) : flag==false? renderProducts(allProduct || []): searchProduct.length!=0 ?renderProducts(searchProduct):<h1 className='text-center'>No product found</h1>
            }
          </div>
        </div>
      </div>
    </div>
    :
    <Skeleton/>
    }
    </>
    );
}

export default Products;
