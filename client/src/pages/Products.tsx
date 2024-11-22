import { useState, useEffect } from 'react';
import fetchData from '@/api_data/fetchData';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '@/childs/ProductCard';
import ProductButton from '@/childs/ProductButton';
import ProductSkeleton from '@/childs/ProductSkeleton';
import Sidebar from '@/childs/Sidebar';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


// Function for getting the return values from fetchData.js
async function dataFetch(setGroupProduct:any,setAllProduct:any,setChunkProduct:any) {
  try {
    const { groupedData, allData, chunkData}:any = await fetchData();
    setGroupProduct(groupedData);
    setAllProduct(allData);
    setChunkProduct(chunkData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function Products() {
  const [allProduct, setAllProduct] = useState<any[]>([]);
  const [groupProduct, setGroupProduct] = useState<any[]>([]);
  const [chunkProduct, setChunkProduct] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>('');
  const [searchProduct, setSearchProduct] = useState<any[]>([]);
  const [flag, setFlag] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const option = useSelector((state:any) => state.categoryReducer);
  const word=useSelector((state:any) =>state.searchReducer)

  useEffect(() => {
      dataFetch(setGroupProduct, setAllProduct, setChunkProduct);
    }, []);

  useEffect(()=>{
      scrollTo(0,0);
    },[page])

  //handle category change==================================
  useEffect(() => {
        if (option.category != 'all') {
            setSelected(option.category);
            setFlag(1);
        } else {
            setFlag(0);
        }
    }, [option]);

//handle search change==================================
    useEffect(() => {
        if (word.search=="") {
            setFlag(0);
        }
        else{
        let filteredProduct = allProduct.filter(item => item.title.toLowerCase().includes(word.search));
        setSearchProduct(filteredProduct);
        setFlag(2);
        }
    }, [word]);

//card renders====================================   
    const renderProducts = (items:any) => items.map((item:any) => (
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
    <Sidebar/>
    {
    (allProduct.length!=0)?
    <div>
      <div className='grid gap-2'>
        <div className='col-span-4'>
          <div className="p-2 grid grid-cols-2 md:grid-cols-5 gap-1 bg-gray-100">
            {
            flag==0 ? renderProducts(chunkProduct[page] || []) : flag==1? renderProducts(groupProduct[selected] || []): flag==2? searchProduct.length!=0 ?renderProducts(searchProduct):<h1 className='text-center col-span-4'>No product found</h1>:<h1>Something Wents Wrong!!</h1>
            }
          </div>
        </div>
      </div>
    </div>
    :
    <ProductSkeleton/>
    }

    {
      flag==0?
      <div className="p-3">
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        {
        page==0?<PaginationPrevious className='text-gray-500'/>:<PaginationPrevious onClick={()=>setPage(page-1)} className='cursor-pointer'/>
          }
        </PaginationItem>
        
        {
        chunkProduct.map((_,i)=>{
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
      :null
    }
    </>
    );
}

export default Products;
