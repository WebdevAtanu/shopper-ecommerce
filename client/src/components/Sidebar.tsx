import { useState, useEffect } from 'react';
import fetchData from '../api_data/fetchData';
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
    const { groupedData }:any = await fetchData();
    const groupKeys = Object.keys(groupedData);
    setGroupKeys(groupKeys);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function Sidebar() {
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
    <div className='flex items-center justify-end gap-3 p-3 group'>
    <Select onValueChange={(value) => optionHandler(value)}>
      <SelectTrigger className="w-[150px]">
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
      <div className="flex border border-black rounded-md gap-1 px-3 py-1">
        <input type="text" placeholder='Search Product' className='outline-0 border-r' onChange={(e)=>setWord(e.target.value)}/>
        <button onClick={searchHandler} className='px-1 outline-0 group-hover:text-blue-800'><i className="bi bi-search"></i></button>
      </div>
    </div>
  );
}

export default Sidebar;
