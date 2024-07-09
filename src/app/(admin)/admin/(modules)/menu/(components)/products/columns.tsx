"use client"

import { ColumnDef } from "@tanstack/react-table"



import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EditProduct from "./EditProduct"
import DeleteProduct from "./DeleteSubCategory"
import ImageGestorUploader from "./image-gestor"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsSchema = {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    category_id: string;
    imageUrl: string;

    categories: {
        id: string;
        name: string;
    }[];
}

export const columns: ColumnDef<ProductsSchema>[] = [
    // {
    //     accessorKey: "id",
    //     header: "ID",
    // },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "slug",
        header: "Slug",
    },
    {
        accessorKey: "price",
        header: "Precio",
        cell: ({ row }) => {
            const rowInfo = row.original

            return (
                <p>$ {rowInfo.price} MXN</p>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const rowInfo = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="text-center">Acciones</DropdownMenuLabel>

                        <DropdownMenuItem
                            asChild
                        >
                            <EditProduct
                                id={rowInfo.id}
                                name={rowInfo.name}
                                price={rowInfo.price}
                                description={rowInfo.description}
                                category_id={rowInfo.category_id}
                                categories={rowInfo.categories}
                            ></EditProduct>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            asChild
                        >
                            <ImageGestorUploader id={rowInfo.id} name={rowInfo.name} imageUrl={rowInfo.imageUrl}></ImageGestorUploader>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            asChild
                        >
                            <DeleteProduct id={rowInfo.id}></DeleteProduct>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
