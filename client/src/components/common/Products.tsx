import { useState, useEffect } from 'react';
import getProducts from '@/service/getProducts';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cards from '@/components/common/Cards';
import Buttons from '@/components/common/Buttons';
import Skeletons from '@/components/common/Skeletons';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// ====================================product data fetch handler================================================
async function dataFetch(setGroupProduct:any,setAllProduct:any,setChunkProduct:any) {
  try {
    const { groupedData, allData, chunkData}:any = await getProducts();
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

  useEffect(() => {
        if (option.category != 'all') {
            setSelected(option.category);
            setFlag(1);
        } else {
            setFlag(0);
        }
    }, [option]);

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
 
  const renderProducts = (items:any) => items.map((item:any) => (
    <div key={item.id} className='border border-gray-400 py-3 flex flex-col justify-between bg-white'>
      <Link to='/product' state={item}>
      <Cards image={item.image}
        title={item.title}
        description={item.description.slice(0, 50)}
        brand={item.brand}
        price={item.price}
        discount={item.discount}/>
      </Link>
      <Buttons data={item}/>
      </div>
    ));

    return (
    <>
    {
    (allProduct.length!=0)?
    <div>
      <div className='grid gap-2'>
        <div className='col-span-4'>
          <div className="p-2 grid grid-cols-2 md:grid-cols-5 gap-1 bg-gray-100">
            {
            flag==0 ? renderProducts(chunkProduct[page] || []) : flag==1? renderProducts(groupProduct[selected] || []): flag==2? searchProduct.length!=0 ?renderProducts(searchProduct):<div className='col-span-5 flex justify-center items-center'><img src="noproduct.png" alt="" className=''/></div>:<h1>Something Wents Wrong!!</h1>
            }
          </div>
        </div>
      </div>
    </div>
    :
    <div className='grid gap-2'>
        <div className='col-span-4'>
        <h1 className='text-center p-3 bg-red-800 text-white'>Initial loading is slow because of free render hosting</h1>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 bg-gray-100">
            <Skeletons/>
            <Skeletons/>
            <Skeletons/>
            <Skeletons/>
            <Skeletons/>
            <Skeletons/>
          </div>
        </div>
      </div>
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
