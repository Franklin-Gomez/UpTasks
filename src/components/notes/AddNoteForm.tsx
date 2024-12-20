import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { NoteFormData } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { createNote } from "../../api/Note"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {

    const params = useParams()
    const projectId = params.projectId!

    const url = useLocation()
    const querys = new URLSearchParams( url.search )
    const taskId = querys.get('viewTask')!

    const query = useQueryClient()

    const initialValue : NoteFormData = { 
        content : ''
    }
    
    // form 
    const { register , formState : { errors } , handleSubmit  } = useForm( { defaultValues : initialValue } )

    const mutate = useMutation({
        mutationFn : createNote ,

        onSuccess : () => { 
            toast.success('Nota Creada Correctamente')
            query.invalidateQueries({ queryKey : ['task']})
        },

        onError : ( error ) => {
            toast.error(error.message)
        }

    })

    const handleCreateNote = (  formData  : NoteFormData) => { 

        const data = { 
            formData : formData ,
            taskId : taskId,


            projectId : projectId
        }

        mutate.mutate( data )

    }

    return (
        
        <div>
            
            <form onSubmit={ handleSubmit( handleCreateNote )}>

                <div className="grid py-2 gap-2">

                    <label htmlFor="content" className="font-bold">Crear Nota : </label>
                    <input type="text" id="content" placeholder="Contenito de la  Nota " className="w-full p-3 bg-white border border-gray-300"
                    {...register("content" , { 
                        required : "El  Contenido de la Nota es boligatorio"
                    })}/>

                    { errors.content && <ErrorMessage>{errors.content.message?.toString()}</ErrorMessage> }

                </div>

                <input type="submit" value="Crear Nota" className="bg-purple-400 text-white py-2 font-bold text-2xl hover:bg-purple-700 cursor-pointer w-full rounded-xl mt-6" />
                
            </form>

        </div>
    )
}
