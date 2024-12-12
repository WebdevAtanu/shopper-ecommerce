import {useState} from 'react';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { toast } from "sonner";
import {useDispatch} from 'react-redux';

export default function Editor({data}:any){
  const [load,setLoad]=useState(false);
  const dispatch=useDispatch();
  const { register, handleSubmit,reset,formState: { errors } } = useForm({
    defaultValues:{
      id:data.id,
      title:data.title,
      description:data.description,
      category:data.category,
      tag:data.tag,
      brand:data.brand,
      price:data.price,
      discount:data.discount,
      stock:data.stock,
    }
  });

  const updateHandler = (updateData:any) => {
                setLoad(true);
                axios.post(`${import.meta.env.VITE_BACKEND}/api/product/update`,updateData)
                .then(res=>{
                  toast.success(res.data.message);
                  setLoad(false);
                  reset({
                    id:updateData.id,
                    title:updateData.title,
                    description:updateData.description,
                    category:updateData.category,
                    tag:updateData.tag,
                    brand:updateData.brand,
                    price:updateData.price,
                    discount:updateData.discount,
                    stock:updateData.stock,
                  });
                  dispatch({type:'INC'});
                })
                .catch(err=>{
                  console.log(err);
                  setLoad(false);
                }) 
            }
  return(
    <div className="">
      <form onSubmit={handleSubmit(updateHandler)}>
      <div className="grid grid-cols-2 gap-5">
          <div className="grid w-full items-center gap-1">
            <label htmlFor="title">Title {errors.title && <span className='text-sm text-red-500'>{typeof errors.title.message === 'string' ? errors.title.message : 'Invalid'}</span>}</label>
            <Input type="text" id="title" {...register("title",
            { required:'is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="description">Description {errors.description && <span className='text-sm text-red-500'>{typeof errors.description.message === 'string' ? errors.description.message : 'Invalid'}</span>}</label>
            <Textarea id="description" className='resize-none' {...register("description",
            { required: 'is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="category">Category {errors.category && <span className='text-sm text-red-500'>{typeof errors.category.message === 'string' ? errors.category.message : 'Invalid'}</span>}</label>
            <Input type="text" id="category" {...register("category",
            { required:'is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="tag">Product tag {errors.tag && <span className='text-sm text-red-500'>{typeof errors.tag.message === 'string' ? errors.tag.message : 'Invalid'}</span>}</label>
            <Input type="text" id="tag" {...register("tag",
            { required:'tag is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="brand">Product brand {errors.brand && <span className='text-sm text-red-500'>{typeof errors.brand.message === 'string' ? errors.brand.message : 'Invalid'}</span>}</label>
            <Input type="text" id="brand" {...register("brand",
            { required:'is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="price">Price {errors.price && <span className='text-sm text-red-500'>{typeof errors.price.message === 'string' ? errors.price.message : 'Invalid'}</span>}</label>
            <Input type="number" id="price" {...register("price",
            { required:'is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="discount">Discount percentage {errors.discount && <span className='text-sm text-red-500'>{typeof errors.discount.message === 'string' ? errors.discount.message : 'Invalid'}</span>}</label>
            <Input type="text" id="discount" {...register("discount",
            { required:'discount is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="stock">Stock {errors.stock && <span className='text-sm text-red-500'>{typeof errors.stock.message === 'string' ? errors.stock.message : 'Invalid'}</span>}</label>
            <Input type="number" id="stock" {...register("stock",
            { required:'stock is required'})}/>
          </div>
      </div>
      <div className="mt-6">
        <Button className="w-full" disabled={load} aria-busy={load} aria-live="polite">{load ? "Please wait..." : "Save Changes"}</Button>
      </div>
  </form>
    </div>
    )
}