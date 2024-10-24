import React, { useState, useEffect } from 'react';
import fetchData from '../api_data/fetchData';
import {useDispatch} from 'react-redux';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const dataFetch = async (setGroupKeys) => {
  try {
    const { groupedData } = await fetchData();
    const groupKeys = Object.keys(groupedData);
    setGroupKeys(groupKeys);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function Sideebar() {
  const [groupKeys, setGroupKeys] = useState([]);

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

  const dispatch=useDispatch();
  const optionHandler= (e)=>{
    dispatch({type:'optionChange',payload:e.target.value});
  }

  return (
    <Sidebar>
  <Menu>
    <MenuItem>
      <select className='p-1 border border-black w-full outline-0 ' onChange={(e)=>optionHandler(e)}>
      <option value='all'>all products</option>
        {groupKeys.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </MenuItem>
    <SubMenu label="Sub Menu">
      <MenuItem> Item </MenuItem>
      <MenuItem> Item </MenuItem>
    </SubMenu>
    <MenuItem> Item </MenuItem>
  </Menu>
</Sidebar>
  );
}

export default Sideebar;
