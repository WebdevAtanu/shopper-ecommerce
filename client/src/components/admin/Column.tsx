import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Editor from "@/components/admin/Editor"
import Deletor from "@/components/admin/Deletor"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const Columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }:any) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (row:any) => (
      <p>{row.getValue().slice(0,35)}...</p>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
  {
    accessorKey: "price",
    cell: ({ row }:any) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
    header: "Price",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: (row:any) => (
      <img
        src={row.getValue()}
        alt="image"
        style={{ borderRadius: '50%', width: '40px', height: '40px' }}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }:any) => {
      const data = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className='flex flex-col items-start'>
          <Dialog>
            <DialogTrigger className='text-sm p-2'>Edit product details</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update product details</DialogTitle>
                <DialogDescription>
                </DialogDescription>
                  <Editor data={data}/>
              </DialogHeader>
            </DialogContent>
          </Dialog>
            <Dialog>
            <DialogTrigger className='text-sm p-2'>Delete product</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm product details</DialogTitle>
                <DialogDescription>
                </DialogDescription>
                  <Deletor data={data}/>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]