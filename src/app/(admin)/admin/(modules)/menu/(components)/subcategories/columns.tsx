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
import DeleteSubCategory from "./DeleteSubCategory"
import EditSubCategory from "./EditSubCategory"
import ImageGestorUploader from "./image-gestor"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubCategoriesSchema = {
    id: string;
    name: string;
    slug: string;
    category_id: string;
    imageUrl: string;


    categories: {
        id: string;
        name: string;
    }[];
}

export const columns: ColumnDef<SubCategoriesSchema>[] = [
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
                            <EditSubCategory id={rowInfo.id} name={rowInfo.name} category_id={rowInfo.category_id} categories={rowInfo.categories}></EditSubCategory>
                        </DropdownMenuItem>

                        <DropdownMenuItem

                            asChild
                        >
                            <ImageGestorUploader id={rowInfo.id} slug={rowInfo.slug} imageUrl={rowInfo.imageUrl} name={rowInfo.name}></ImageGestorUploader>
                        </DropdownMenuItem>


                        <DropdownMenuItem
                            asChild
                        >
                            <DeleteSubCategory id={rowInfo.id}></DeleteSubCategory>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
