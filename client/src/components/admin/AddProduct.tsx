import {useState} from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios';
import toast from 'react-hot-toast';


export default function AddProduct() {
  const [load,setLoad]=useState(false);
  const [image,setImage]=useState("image.png");
  const { register, handleSubmit,reset,formState: { errors } } = useForm();

// ====================================add product form handler================================================
    const formHandler = (data:any) => {
                setLoad(true);
                setProductData(data);
                axios.post(`${import.meta.env.VITE_BACKEND}/api/product/insert`,data)
                .then(res=>{
                  toast(res.data.message);
                  setLoad(false);
                  reset();
                })
                .catch(err=>{
                  console.log(err);
                  setLoad(false);
                })
                
            }
    
  return (
<div className="">
  <form onSubmit={handleSubmit(formHandler)}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="border border-black rounded p-2">
        <h1 className='underline underline-offset-2'>Basic information</h1>
        <div className="flex flex-col gap-3 p-3">
          <div className="grid w-full items-center gap-1">
            <label htmlFor="id">Product ID {errors.id && <span className='text-sm text-red-500'>{typeof errors.id.message === 'string' ? errors.id.message : 'Invalid'}</span>}</label>
            <Input type="number" id="id" placeholder="eg: 00123" {...register("id",
            { required:'is required',
            minLength:{
            value:3,
            message:'is too short'
            }})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="title">Title {errors.title && <span className='text-sm text-red-500'>{typeof errors.title.message === 'string' ? errors.title.message : 'Invalid'}</span>}</label>
            <Input type="text" id="title" placeholder="eg: Powder Canister" {...register("title",
            { required:'is required',
            minLength:{
            value:10,
            message:'enter proper title'
            }})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="description">Description {errors.description && <span className='text-sm text-red-500'>{typeof errors.description.message === 'string' ? errors.description.message : 'Invalid'}</span>}</label>
            <Textarea placeholder="eg: The Powder Canister is a finely milled setting powder designed to set makeup and control shine." id="description" className='resize-none' {...register("description",
            { required: 'is required',
            minLength:{
            value:15,
            message:'enter proper description'
            }
            })}/>
          </div>
        </div>
      </div>
      <div className="border border-black rounded p-2 row-span-2">
        <h1 className='underline underline-offset-2'>Product details</h1>
        <div className="flex flex-col gap-3 p-3">
          <div className="grid w-full items-center gap-1">
            <label htmlFor="category">Category {errors.category && <span className='text-sm text-red-500'>{typeof errors.category.message === 'string' ? errors.category.message : 'Invalid'}</span>}</label>
            <Input type="text" id="category" placeholder="eg: beauty" {...register("category",
            { required:'is required',
            minLength:{
            value:5,
            message:'enter proper category'
            }})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="tag">Product tag {errors.tag && <span className='text-sm text-red-500'>{typeof errors.tag.message === 'string' ? errors.tag.message : 'Invalid'}</span>}</label>
            <Input type="text" id="tag" placeholder="eg: Face powder" {...register("tag",
            { required:'tag is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="brand">Product brand {errors.brand && <span className='text-sm text-red-500'>{typeof errors.brand.message === 'string' ? errors.brand.message : 'Invalid'}</span>}</label>
            <Input type="text" id="brand" placeholder="eg: Velvet Touch" {...register("brand",
            { required:'is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="image">Image URL {errors.image && <span className='text-sm text-red-500'>{typeof errors.image.message === 'string' ? errors.image.message : 'Invalid'}</span>}</label>
            <Input type="text" id="image" placeholder="Enter proper URL of the product image for preview" {...register("image",
            { required:'is required',
            minLength:{
            value:15,
            message:'enter proper url of the product image'
            }})} onChange={e=>setImage(e.target.value)}/>
          </div>
          <div className="">
            <img src={image} alt="image preview" className='w-1/4'/>
          </div>
        </div>
      </div>
      <div className="border border-black rounded p-2">
        <h1 className='underline underline-offset-2'>Price & Stock details</h1>
        <div className="flex flex-col gap-3 p-3">
          <div className="grid w-full items-center gap-1">
            <label htmlFor="title">Price {errors.price && <span className='text-sm text-red-500'>{typeof errors.price.message === 'string' ? errors.price.message : 'Invalid'}</span>}</label>
            <Input type="number" id="price" placeholder="product price" {...register("price",
            { required:'is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="discount">Discount percentage {errors.discount && <span className='text-sm text-red-500'>{typeof errors.discount.message === 'string' ? errors.discount.message : 'Invalid'}</span>}</label>
            <Input type="text" id="discount" placeholder="eg: 05%" {...register("discount",
            { required:'discount is required'})}/>
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="stock">Stock {errors.stock && <span className='text-sm text-red-500'>{typeof errors.stock.message === 'string' ? errors.stock.message : 'Invalid'}</span>}</label>
            <Input type="number" id="stock" placeholder="eg: 69" {...register("stock",
            { required:'stock is required'})}/>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6">
      <Button className="w-full" disabled={load} aria-busy={load} aria-live="polite">{load ? "Please wait..." : "Add Product"}</Button>
    </div>
  </form>
</div>
  );
}