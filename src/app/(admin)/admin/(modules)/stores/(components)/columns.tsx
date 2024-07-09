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
import EditStore from "./EditStores"
import DeleteStores from "./DeleteStores"
// import EditProduct from "./EditProduct"
// import DeleteProduct from "./DeleteSubCategory"
// import ImageGestorUploader from "./image-gestor"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type schema = {
    id: string;
    name: string;
    address: string;
    url: string;


}

export const columns: ColumnDef<schema>[] = [
    // {
    //     accessorKey: "id",
    //     header: "ID",
    // },
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "address",
        header: "Dirección",
        cell: ({ row }) => {
            const rowInfo = row.original

            return (
                <div className="max-w-96">
                    <p className="truncate">{rowInfo.address}</p>
                </div>
            )
        },
    },
    {
        accessorKey: "url",
        header: "Url",
        cell: ({ row }) => {
            const rowInfo = row.original

            return (
                <div className="max-w-96">
                    <p className="truncate">{rowInfo.url}</p>
                </div>
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
                            <EditStore
                                id={rowInfo.id}
                                name={rowInfo.name}
                                address={rowInfo.address}
                                url={rowInfo.url}

                            ></EditStore>
                        </DropdownMenuItem>


                        <DropdownMenuItem
                            asChild
                        >
                            <DeleteStores id={rowInfo.id}></DeleteStores>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu >
            )
        },
    },
]
