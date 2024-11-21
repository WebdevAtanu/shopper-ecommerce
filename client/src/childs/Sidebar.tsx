import { useState, useEffect } from 'react';
import fetchData from '../api_data/fetchData';
import {useDispatch} from 'react-redux';

// ===================fetching product keys===================
const dataFetch = async (setGroupKeys:any) => {
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
  const [word,setWord]=useState('');

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

// ===================option handler===================
  const optionHandler= (e:any)=>{
    dispatch({type:'optionChange',payload:e.target.value});
  }

// ===================search function===================
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
      <select className='p-1 h-full outline-0' onChange={(e)=>optionHandler(e)}>
        <option value='all'>all products</option>
        {groupKeys.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
        ))}
      </select>
      <div className="flex border border-black gap-1 px-3 py-1 rounded-lg">
        <input type="text" placeholder='Search product' className='outline-0 border-r' onChange={(e)=>setWord(e.target.value)}/>
        <button onClick={searchHandler} className='px-1 outline-0 group-hover:text-blue-800'><i className="bi bi-search"></i></button>
      </div>
    </div>
  );
}

export default Sidebar;
