import { useState, useEffect } from 'react';
import fetchData from '@/api_data/fetchData';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '@/childs/ProductCard';
import ProductButton from '@/childs/ProductButton';
import ProductSkeleton from '@/childs/ProductSkeleton';
import Sidebar from '@/components/Sidebar';
import Slider from '@/components/Slider';


import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


import { Button } from "@/components/ui/button"


import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


// Function for getting the return values from fetchData.js
async function dataFetch(setGroupProduct,setAllProduct,setChunkProduct) {
  try {
    const { groupedData, allData, chunkData} = await fetchData();
    setGroupProduct(groupedData);
    setAllProduct(allData);
    setChunkProduct(chunkData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function Products() {
  const [groupProduct, setGroupProduct] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [chunkProduct, setChunkProduct] = useState([]);
  const [selected, setSelected] = useState('');
  const [searchProduct, setSearchProduct] = useState([]);
  const [flag, setFlag] = useState(true);
  const [page, setPage] = useState(0);
  const option = useSelector(state => state.categoryReducer);
  const word=useSelector(state=>state.searchReducer)
  const dispatch=useDispatch();

    useEffect(() => {
        dataFetch(setGroupProduct, setAllProduct, setChunkProduct);
    }, [page]);

  //handle scroll==================================
    // const handleScroll = () => {
    //     let height = document.documentElement.scrollHeight;
    //     let inner = window.innerHeight;
    //     let top = document.documentElement.scrollTop;
    //         if (top + inner + 1 >= height) {
    //             setPage(page+1);
    //         }
    // }

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

    useEffect(()=>{
      scrollTo(0,0);
    },[page])
  
    const renderProducts = (items) => items.map((item) => (
    <div key={item.id} className='border border-gray-400 py-3 flex flex-col justify-between bg-white'>
      <Link to='/product' state={item}>
      <ProductCard thumbnail={item.thumbnail}
      title={item.title}
      description={item.description.slice(0, 50)}
      brand={item.brand}
      price={item.price}
      rating={item.rating}
      discount={item.discountPercentage}/>
    </Link>
    <ProductButton/>
    </div>
    ));

    return (
    <>
        <div className="flex justify-end px-3 py-2">
        <HoverCard>
  <HoverCardTrigger className='border border-black py-1 px-3 cursor-pointer'><i className="bi bi-funnel"></i> Filter</HoverCardTrigger>
  <HoverCardContent>
    <Sidebar/>
  </HoverCardContent>
</HoverCard>

          
    </div>
    {
    (allProduct.length!=0)?
    <div>
      <div className='grid gap-2'>
        <div className='col-span-4'>
          <div className="p-2 grid grid-cols-2 md:grid-cols-5 gap-1 bg-gray-100">
            {
            flag==true ? renderProducts(groupProduct[selected] || []) : flag==false? renderProducts(chunkProduct[page] || []): searchProduct.length!=0 ?renderProducts(searchProduct):<h1 className='text-center col-span-4'>No product found</h1>
            }
          </div>
        </div>
      </div>
    </div>
    :
    <ProductSkeleton/>
    }
    <div className="p-3">
    <Pagination>
  <PaginationContent>
    <PaginationItem>
    {
      page==0?<PaginationPrevious className='text-gray-500'/>:<PaginationPrevious onClick={()=>setPage(page-1)} className='cursor-pointer'/>
    }
    </PaginationItem>
    
      {
        chunkProduct.map((item,i)=>{
          return(
            <PaginationItem key={i}>
            <button onClick={()=>setPage(i)} className={`${i==page?'border border-gray-500':'bg-white'} border rounded px-2 hover:bg-gray-100`}>{i}</button>
            </PaginationItem>
            )
        })
      }
    
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>{
      chunkProduct.length-1==page?<PaginationNext className='text-gray-500'/>:<PaginationNext onClick={()=>setPage(page+1)} className='cursor-pointer'/>
    }
    </PaginationItem>
  </PaginationContent>
</Pagination>
</div>

    </>
    );
}

export default Products;
