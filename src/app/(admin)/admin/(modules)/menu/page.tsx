import React from 'react'
export const dynamic = 'force-dynamic'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


//categorias n1
import { allCategoriesN1, subcategoryById } from "@/data/menu"
import { DataTable as DataTableCategory } from './(components)/categories/data-table'
import { CategoriesSchema, columns as columnsCategory } from "./(components)/categories/columns"

//sub categorias n2
import { allCategoriesN2 } from "@/data/menu"
import { DataTable as DataTableSubCategory } from './(components)/subcategories/data-table'
import { SubCategoriesSchema, columns as columnsSubCategory } from "./(components)/subcategories/columns"


//productos
import { allProducts } from "@/data/menu"
import { DataTable as DataTableProducts } from './(components)/products/data-table'
import { ProductsSchema, columns as columnsProducts } from "./(components)/products/columns"
import { createClient } from '@/utils/supabase/server'

interface categoriesInfo {
    id: string;
    name: string;
}

async function getDataCategoriesSelect(): Promise<categoriesInfo[]> {
    // Fetch data from your API here.
    const info = await allCategoriesN1();

    if (!info) {
        // Manejar el caso en que loads sea null
        console.error('Error: No se pudo obtener la carga');
        return [];
    }

    return info.map((dt: categoriesInfo) => ({
        id: dt.id,
        name: dt.name,
    }));
}

interface subCategoriesInfo {
    id: string;
    name: string;
}

async function getDataSubCategoriesSelect(): Promise<subCategoriesInfo[]> {
    // Fetch data from your API here.
    const info = await allCategoriesN2();

    if (!info) {
        // Manejar el caso en que loads sea null
        console.error('Error: No se pudo obtener la carga');
        return [];
    }

    return info.map((dt: subCategoriesInfo) => ({
        id: dt.id,
        name: dt.name,
    }));
}

async function getDataCategories(): Promise<CategoriesSchema[]> {
    // Fetch data from your API here.
    const info = await allCategoriesN1();

    if (!info) {
        // Manejar el caso en que loads sea null
        console.error('Error: No se pudo obtener la carga');
        return [];
    }

    const CategoriesOptions = await getDataCategoriesSelect()


    return info.map((dt: CategoriesSchema) => ({
        id: dt.id,
        name: dt.name,
        slug: dt.slug,
        categories: CategoriesOptions,
    }));
}


async function getDataSubCategories(): Promise<SubCategoriesSchema[]> {

    const supabase = createClient();

    // Fetch data from your API here.
    const info = await supabase
        .from('products-categories-n2')
        .select('*')
        .order("created_at", { ascending: false })



    if (!info.data) {
        // Manejar el caso en que loads sea null
        console.error('Error: No se pudo obtener la carga');
        return [];
    }

    const CategoriesOptions = await getDataCategoriesSelect()


    return info.data.map((dt: SubCategoriesSchema) => ({
        id: dt.id,
        name: dt.name,
        slug: dt.slug,
        imageUrl: dt.imageUrl,
        category_id: dt.category_id,
        categories: CategoriesOptions
    }));
}

async function getDataProducts(): Promise<ProductsSchema[]> {
    // Fetch data from your API here.
    const info = await allProducts();

    if (!info) {
        // Manejar el caso en que loads sea null
        console.error('Error: No se pudo obtener la carga');
        return [];
    }

    const CategoriesOptions = await getDataSubCategoriesSelect()

    return info.map((dt: ProductsSchema) => ({
        id: dt.id,
        name: dt.name,
        slug: dt.slug,
        price: dt.price,
        category_id: dt.category_id,
        imageUrl: dt.imageUrl,
        description: dt.description,
        categories: CategoriesOptions,
    }));
}






const MenuDashboard = async () => {

    const dataCategories = await getDataCategories()

    const dataSubCategories = await getDataSubCategories()

    const dataProducts = await getDataProducts()

    const CategoriesOptions = await getDataCategoriesSelect()

    const SubCategoriesOptions = await getDataSubCategoriesSelect()


    return (
        <div className='container flex flex-col space-y-5'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin">Inicio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbPage>Menú</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex flex-col lg:flex-row gap-10'>

                {/* tabla de categorias principales */}
                <div className='flex flex-col w-12/12 lg:w-6/12'>
                    <DataTableCategory data={dataCategories} columns={columnsCategory} categories={CategoriesOptions}></DataTableCategory>
                </div>

                {/* tabla de sub categorias de las categorias principales */}
                <div className='flex flex-col w-12/12 lg:w-6/12'>
                    <DataTableSubCategory data={dataSubCategories} columns={columnsSubCategory} categories={CategoriesOptions}></DataTableSubCategory>
                </div>
            </div>

            {/* tabla con todos los productos */}
            <div>
                <DataTableProducts data={dataProducts} columns={columnsProducts} categories={SubCategoriesOptions}></DataTableProducts>
            </div>

        </div>
    )
}

export default MenuDashboard