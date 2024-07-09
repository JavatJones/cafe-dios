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
import { getRolesById, getUserAuthByID } from "@/data/user"
import DeleteUser from "./delete-user"
import UpdatePassword from "./edit-password"
import EditUser from "./edit-user"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type schema = {
    id: string;
    User_id: string;
    name: string;
    role: string;
    roles: {
        id: string;
        name: string;
    }[];
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
                    <DropdownMenuContent className="flex flex-col space-y-2" align="center">
                        <DropdownMenuLabel className="text-center">Acciones</DropdownMenuLabel>

                        <DropdownMenuItem
                            asChild
                        >
                            <EditUser id={rowInfo.id} User_id={rowInfo.User_id} name={rowInfo.name} role={rowInfo.role} roles={rowInfo.roles}></EditUser>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            asChild
                        >
                            <UpdatePassword id={rowInfo.User_id}></UpdatePassword>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            asChild
                        >
                            <DeleteUser id={rowInfo.User_id}></DeleteUser>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
