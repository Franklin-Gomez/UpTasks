import { useMutation, useQueryClient } from "@tanstack/react-query"
import { NoteType } from "../../types"
import { deleteNote } from "../../api/Note"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { userAuth } from "../../hooks/useAuth"
import { useMemo } from "react"

export default function NoteDetails(  { nota }  : { nota : NoteType } ) {

    const params = useParams()
    const projectId = params.projectId! 

    const url = useLocation()
    const query = new URLSearchParams(url.search)
    const taskId = query.get("viewTask")!
    
    const queryClient = useQueryClient()

    const userId = userAuth()
    
    const canDelete = useMemo(() => userId.data?._id.toString() == nota.createdBy.toString() , [ userId.data?._id] )

    const mutate = useMutation({ 
        mutationFn : deleteNote ,
        onSuccess: ( data ) => { 
            toast.success( data )
            queryClient.invalidateQueries( { queryKey : ['task' , taskId] })
        },
        onError: (error) => { 
            toast.error( error.message)
        }
    })
    
    return (
        <>  
            <div className="flex justify-between">
                <p>{nota.content}</p>

                {   canDelete &&

                    <>
                        <button
                            className="bg-red-400 hover:bg-red-600 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
                            onClick={() => mutate.mutate({ projectId : projectId , taskId : taskId , noteId : nota._id}) }
                        >
                            Eliminar
                        </button>
                    </>

                }



            </div>
        </>
    )
}
