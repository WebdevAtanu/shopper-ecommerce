import React, { useState, useEffect } from 'react';
import fetchData from '../api_data/fetchData';
import {useDispatch} from 'react-redux';

// ===================fetching product keys===================
const dataFetch = async (setGroupKeys) => {
  try {
    const { groupedData } = await fetchData();
    const groupKeys = Object.keys(groupedData);
    setGroupKeys(groupKeys);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function Sidebar() {
  const [groupKeys, setGroupKeys] = useState([]);
  const dispatch=useDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetchDataAndSetState = async () => {
      await dataFetch((keys) => {
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

// ===================option handler===================
  const optionHandler= (e)=>{
    dispatch({type:'optionChange',payload:e.target.value});
  }

// ===================search function===================
  const searchHandler=(word)=>{
    if(word==null || word==''){
      return null
    }
    else{
    dispatch({type:'searchWord',payload:word.toLowerCase()})
    }
  }

  return (
  <div>
  <div className="flex flex-col gap-1">
    <p>Search product</p>
    <input type="text" placeholder='Search product' className='p-1 border border-black w-full outline-0' onChange={(e)=>searchHandler(e.target.value)}/>
  </div>
  <div className="flex flex-col gap-1 mt-3">
    <p>Select category</p>
      <select className='p-1 border border-black w-full outline-0 ' onChange={(e)=>optionHandler(e)}>
      <option value='all'>all products</option>
        {groupKeys.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
  </div>
  </div>
  );
}

export default Sidebar;
