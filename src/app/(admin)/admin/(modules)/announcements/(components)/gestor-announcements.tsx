"use client"
import { useRouter } from 'next/navigation'
import React, { ChangeEvent } from 'react'
import { createClient } from "@/utils/supabase/client";
import { toast } from 'react-toastify'
import { Button } from "@/components/ui/button"
import { BsPaperclip } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator';
import { ArrowDown, ArrowUp } from 'lucide-react';

export interface AnnouncementsProps {
  Announcements: {
    id: string;
    imageUrl: string;
    order: number
  }[];
}

const GestorAnnouncements = ({ Announcements }: AnnouncementsProps) => {

  const router = useRouter()

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {

    let file
    if (e.target.files) {
      file = e.target.files[0];
    }

    console.log(file)

    try {

      const supabase = createClient();

      const { data, error } = await supabase.storage
        .from("Images")
        .upload("announcements/" + Math.random() + file?.name, file as File)

      if (data) {

        const responseOrder = await supabase
          .from('announcements')  // Reemplaza 'announcements' con el nombre de tu tabla
          .select('order', { count: 'exact' }) // Selecciona la columna 'order'
          .order('order', { ascending: false }) // Ordena de mayor a menor
          .limit(1); // Solo toma el más grande

        if (responseOrder.error) {
          console.error('Error fetching the maximum order:', error);
          return null;
        }

        const maxOrder = responseOrder.data[0]?.order ?? 0; // Si no hay filas, asume 0 como el máximo
        const nextOrder = maxOrder + 1; // Calcula el próximo número de orden


        const path = data.path;
        const response = await supabase.from("announcements")
          .insert({ imageUrl: path, order: nextOrder })
        router.refresh()
        toast.success("Exito!")
        router.refresh()


      }

      if (error) {
        toast.error(`error:${error.name} ,${error.message}`)
      }
      router.refresh()
    } catch (error) {
      toast.error("Error")
    }

  };


  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      const supabase = createClient();
      // Eliminar la imagen del almacenamiento
      const { data: storageData, error: storageError } = await supabase.storage
        .from("Images")
        .remove([imageUrl]);

      if (storageError) {
        toast.error("Error al eliminar la imagen");
        console.error("Error al eliminar la imagen:", storageError.message);
        return;
      }

      if (storageData) {
        // Eliminar el anuncio de la base de datos
        const { data: deleteData, error: deleteError } = await supabase
          .from("announcements")
          .delete()
          .eq('id', id);

        if (deleteError) {
          toast.error("Error al eliminar el anuncio");
          console.error("Error al eliminar el anuncio:", deleteError.message);
          return;
        }

        if (deleteData) {
          toast.success("Anuncio eliminado");
        }
      }
    } catch (error) {
      toast.error("Error inesperado");
      console.error("Error inesperado:", error);
    }

    // Refrescar la página para reflejar los cambios
    router.refresh();
  };

  const handleUpMove = async (id: string, imageUrl: string, order: number) => {
    try {
      const supabase = createClient();

      // Obtener el objeto actual
      const { data: currentData, error: currentError } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .single();

      if (currentError || !currentData) {
        toast.error("Error al obtener el objeto actual");
        console.error("Error al obtener el objeto actual:", currentError);
        return;
      }

      // Obtener todos los objetos y ordenarlos
      const { data: allData, error: allError } = await supabase
        .from("announcements")
        .select("id, order")
        .order("order", { ascending: true });

      if (allError || !allData || allData.length === 0) {
        toast.error("Error al obtener la lista completa");
        console.error("Error al obtener la lista completa:", allError);
        return;
      }

      // Buscar el índice del objeto actual en la lista ordenada
      const currentIndex = allData.findIndex(item => item.id === id);

      if (currentIndex === -1) {
        toast.error("No se encontró el objeto actual en la lista");
        console.error("No se encontró el objeto actual en la lista:", id);
        return;
      }

      // Verificar si el objeto actual ya es el primero en la lista
      if (currentIndex === 0) {
        toast.error("Este objeto ya está al principio de la lista");
        console.warn("El objeto actual ya está al principio de la lista:", currentData);
        return;
      }

      // Obtener el objeto de arriba (anterior en la lista)
      const previousData = allData[currentIndex - 1];

      if (!previousData) {
        toast.error("No hay objeto para mover hacia arriba");
        console.warn("No hay objeto para mover hacia arriba");
        return;
      }

      // Intercambiar los órdenes usando un valor temporal
      const { id: previousId, order: previousOrder } = previousData;

      // Valor temporal (aseguramos que no exista en la columna 'order')
      const tempOrder = -1;

      console.log("Intercambiando órdenes usando valor temporal:");
      console.log(`Objeto actual: ID = ${id}, Order = ${order}`);
      console.log(`Objeto de arriba: ID = ${previousId}, Order = ${previousOrder}`);
      console.log(`Usando valor temporal: Order = ${tempOrder}`);

      // Paso 1: Asignar valor temporal al objeto de arriba
      const { error: updatePreviousTempError } = await supabase
        .from("announcements")
        .update({ order: tempOrder })
        .eq("id", previousId);

      if (updatePreviousTempError) {
        toast.error("Error al asignar valor temporal al objeto de arriba");
        console.error("Error al asignar valor temporal al objeto de arriba:", updatePreviousTempError.message);
        return;
      }

      // Paso 2: Asignar el valor 'order' del objeto de arriba al objeto actual
      const { error: updateCurrentError } = await supabase
        .from("announcements")
        .update({ order: previousOrder })
        .eq("id", id);

      if (updateCurrentError) {
        toast.error("Error al actualizar el objeto actual");
        console.error("Error al actualizar el objeto actual:", updateCurrentError.message);
        return;
      }

      // Paso 3: Asignar el valor original del objeto actual al objeto de arriba
      const { error: updatePreviousFinalError } = await supabase
        .from("announcements")
        .update({ order: order })
        .eq("id", previousId);

      if (updatePreviousFinalError) {
        toast.error("Error al actualizar el objeto de arriba");
        console.error("Error al actualizar el objeto de arriba:", updatePreviousFinalError.message);
        return;
      }

      toast.success("Movido hacia arriba exitosamente");
    } catch (error) {
      toast.error("Error inesperado");
      console.error("Error inesperado:", error);
    }

    // Refrescar la página para reflejar los cambios
    router.refresh();
  };

  const handleDownMove = async (id: string, imageUrl: string, order: number) => {
    try {
      const supabase = createClient();

      // Obtener el objeto actual
      const { data: currentData, error: currentError } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .single();

      if (currentError || !currentData) {
        toast.error("Error al obtener el objeto actual");
        console.error("Error al obtener el objeto actual:", currentError);
        return;
      }

      // Obtener todos los objetos y ordenarlos
      const { data: allData, error: allError } = await supabase
        .from("announcements")
        .select("id, order")
        .order("order", { ascending: true });

      if (allError || !allData || allData.length === 0) {
        toast.error("Error al obtener la lista completa");
        console.error("Error al obtener la lista completa:", allError);
        return;
      }

      // Buscar el índice del objeto actual en la lista ordenada
      const currentIndex = allData.findIndex(item => item.id === id);

      if (currentIndex === -1) {
        toast.error("No se encontró el objeto actual en la lista");
        console.error("No se encontró el objeto actual en la lista:", id);
        return;
      }

      // Verificar si el objeto actual ya es el último en la lista
      if (currentIndex === allData.length - 1) {
        toast.error("Este objeto ya está al final de la lista");
        console.warn("El objeto actual ya está al final de la lista:", currentData);
        return;
      }

      // Obtener el objeto de abajo (siguiente en la lista)
      const nextData = allData[currentIndex + 1];

      if (!nextData) {
        toast.error("No hay objeto para mover hacia abajo");
        console.warn("No hay objeto para mover hacia abajo");
        return;
      }

      // Intercambiar los órdenes usando un valor temporal
      const { id: nextId, order: nextOrder } = nextData;

      // Valor temporal (aseguramos que no exista en la columna 'order')
      const tempOrder = -1;

      console.log("Intercambiando órdenes usando valor temporal:");
      console.log(`Objeto actual: ID = ${id}, Order = ${order}`);
      console.log(`Objeto de abajo: ID = ${nextId}, Order = ${nextOrder}`);
      console.log(`Usando valor temporal: Order = ${tempOrder}`);

      // Paso 1: Asignar valor temporal al objeto de abajo
      const { error: updateNextTempError } = await supabase
        .from("announcements")
        .update({ order: tempOrder })
        .eq("id", nextId);

      if (updateNextTempError) {
        toast.error("Error al asignar valor temporal al objeto de abajo");
        console.error("Error al asignar valor temporal al objeto de abajo:", updateNextTempError.message);
        return;
      }

      // Paso 2: Asignar el valor 'order' del objeto de abajo al objeto actual
      const { error: updateCurrentError } = await supabase
        .from("announcements")
        .update({ order: nextOrder })
        .eq("id", id);

      if (updateCurrentError) {
        toast.error("Error al actualizar el objeto actual");
        console.error("Error al actualizar el objeto actual:", updateCurrentError.message);
        return;
      }

      // Paso 3: Asignar el valor original del objeto actual al objeto de abajo
      const { error: updateNextFinalError } = await supabase
        .from("announcements")
        .update({ order: order })
        .eq("id", nextId);

      if (updateNextFinalError) {
        toast.error("Error al actualizar el objeto de abajo");
        console.error("Error al actualizar el objeto de abajo:", updateNextFinalError.message);
        return;
      }

      toast.success("Movido hacia abajo exitosamente");
    } catch (error) {
      toast.error("Error inesperado");
      console.error("Error inesperado:", error);
    }

    // Refrescar la página para reflejar los cambios
    router.refresh();
  };

  return (
    <div className='flex flex-col space-y-16'>

      <div className='flex flex-row justify-end'>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Subir anuncio</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subir anuncio</DialogTitle>
            </DialogHeader>

            <input
              type="file"
              className="hidden"
              id="fileInput"
              accept="image/*"

              onChange={(e) => {
                handleUpload(e);
              }}

            />
            <label
              htmlFor="fileInput"
              className="text-neutral-90 text-white text-center p-2 bg-black rounded-md flex justify-center cursor-pointer items-center"
            >
              <BsPaperclip />
              <span className="">
                Seleccionar imagen
              </span>
            </label>
          </DialogContent>
        </Dialog>

      </div>

      {Announcements.map((data, index) => (
        <div key={index} className='w-full flex flex-col gap-5'>

          {/* CONTROLS */}
          <div className='flex flex-row justify-between gap-10'>
            <div className='flex flex-row gap-5'>

              <div className='flex'>
                {/* Up */}
                <Button variant={'default'} size={'icon'} onClick={() => {
                  handleUpMove(data.id, data.imageUrl, data.order);
                }}
                >
                  <ArrowUp></ArrowUp>
                </Button>
              </div>

              <div className='flex'>
                {/* Down */}
                <Button variant={'default'} size={'icon'} onClick={() => {
                  handleDownMove(data.id, data.imageUrl, data.order);
                }}
                >
                  <ArrowDown></ArrowDown>
                </Button>
              </div>
            </div>

            {/* Delete */}
            <div className='flex'>
              <Button variant={'destructive'} size={'icon'} onClick={() => {
                handleDelete(data.id, data.imageUrl);
              }}
              >
                X
              </Button>
            </div>
          </div>

          <img
            alt='Oferta'
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images/${data.imageUrl}`}
            className="w-full lg:h-auto object-cover"
          ></img>

          <Separator orientation='horizontal'></Separator>

        </div>
      ))
      }


    </div >
  )
}

export default GestorAnnouncements