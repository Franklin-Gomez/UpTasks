import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { createNote } from "@/api/NotaAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {

    const initialValues : NoteFormData = { 
        content : ''
    }

    const params = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams( location.search )

    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const { register , handleSubmit , reset ,  formState  : { errors }} = useForm({ defaultValues : initialValues})

    const { mutate } = useMutation({
        mutationFn : createNote,
        onSuccess : ( data ) => { 
            toast.success( data )
            reset()
        },
        onError : ( error ) => { 
            toast.error( error.message )
        }
    })

    const handleAddNote = ( formData : NoteFormData ) => { 
        mutate( { formData , projectId , taskId})
    }

    return (
        <form
            onSubmit={ handleSubmit( handleAddNote ) }
            className="space-y-3"
            noValidate

        >
            <div className="flex flex-col gap-2">
                <label htmlFor="content" className="font-bold">Crear Nota</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-300"
                    {...register('content' , {
                        required : 'El Contenido de la nota es obligatorio'
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>

            <input 
                type="submit"
                value="Crear Nota" 
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
            
            />
            
        </form>
    )
}
