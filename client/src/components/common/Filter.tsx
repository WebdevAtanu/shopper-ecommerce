import { useState, useEffect } from 'react';
import getProducts from '@/service/getProducts';
import {useDispatch} from 'react-redux';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



// ====================================product key fetch handler================================================
const dataFetch = async (setGroupKeys:any) => {
  try {
    const { groupedData }:any = await getProducts();
    const groupKeys = Object.keys(groupedData);
    setGroupKeys(groupKeys);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function Filter() {
  const [groupKeys, setGroupKeys] = useState([]);
  const dispatch=useDispatch();
  const [word,setWord]=useState('');

// ====================================mount keys handler================================================
  useEffect(() => {
    let isMounted = true;
    const fetchDataAndSetState = async () => {
      await dataFetch((keys:any) => {
        if (isMounted) {
          setGroupKeys(keys);
        }
      });
    };
    fetchDataAndSetState();
    return () => {
      isMounted = false;
    };
  }, []);

// ====================================option change handler================================================
  const optionHandler= (value:any)=>{
    dispatch({type:'optionChange',payload:value});
  }

// ====================================search handler================================================
  const searchHandler=()=>{
    if(word==null || word==''){
      dispatch({type:'searchWord',payload:""})
    }
    else{
    dispatch({type:'searchWord',payload:word.toLowerCase()})
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-2 p-2 justify-end'>
      <div></div>
      <div></div>
      <div className="flex border border-black rounded-md gap-1 px-3 py-1 group">
        <input type="text" placeholder='Search Product' className='outline-0 border-r w-full' onChange={(e)=>setWord(e.target.value)}/>
        <button onClick={searchHandler} className='px-1 outline-0 group-hover:text-blue-800'><i className="bi bi-search"></i></button>
      </div>
      <Select onValueChange={(value) => optionHandler(value)}>
        <SelectTrigger className="w-full border border-black">
          <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
            <SelectItem value="all">all products</SelectItem>
          <SelectLabel>Featured Products</SelectLabel>
          {groupKeys.map((item, index) => (
        <SelectItem key={index} value={item}>{item}</SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
    </Select>
    </div>
  );
}

export default Filter;
