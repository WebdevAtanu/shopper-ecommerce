import {useState} from 'react';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { toast } from "sonner";
import {useDispatch} from 'react-redux';

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

export default function Deletor({data}:any){
  const [load,setLoad]=useState(false);
  const dispatch=useDispatch();

  const deleteHandler = (data:any) => {
                setLoad(true);
                axios.post(`${import.meta.env.VITE_BACKEND}/api/product/delete`,data)
                .then(res=>{
                  toast.success(res.data.message);
                  setLoad(false);
                  dispatch({type:'INC'});
                })
                .catch(err=>{
                  console.log(err);
                  setLoad(false);
                }) 
            }
  return(
    <div className="">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{data.title}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Price</TableCell>
            <TableCell><i className="bi bi-currency-rupee"></i>{data.price}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Discount</TableCell>
            <TableCell>{data.discount}% off</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell>{data.stock}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>{data.category}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Brand</TableCell>
            <TableCell>{data.brand}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>{data.tag}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>{data.description}</TableCell>
        </TableRow>
        </TableBody>
        </Table>
      <Button className="w-full" onClick={()=>deleteHandler(data)} disabled={load} aria-busy={load} aria-live="polite">{load ? "Please wait..." : "Delete now"}</Button>
    </div>
    )
}