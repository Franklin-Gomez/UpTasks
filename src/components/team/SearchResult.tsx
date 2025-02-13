import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMemberType } from "../../types"
import { addMemberById } from "../../api/Team"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResult = { 
    user : TeamMemberType
    resetData : () => void
}


export default function SearchResult( { user , resetData } : SearchResult ) {

    const param = useParams()
    const projectId = param.projectId!

    const queryClient = useQueryClient()
    const mutate = useMutation ({
        mutationFn : addMemberById,

        onSuccess : ( data ) => { 
            resetData()
            toast.success( data )
            queryClient.invalidateQueries({ queryKey : ['teamMember' , projectId ]})
        },

        onError : (error) => {
            toast.error( error.message )
        }
    
    })

    const handleAddUserToProject = () => { 

        const data = {
            projectId,
            id : user._id
        }

        mutate.mutate( data  ) 
    }
    
    
    return (
        <>
            <p className="mt-10 text-center font-bold"> Resultado : </p>

            <div className=" flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                    onClick={handleAddUserToProject}
                > Agregar el Proyecto </button>
            </div>
        </>
    )
}
