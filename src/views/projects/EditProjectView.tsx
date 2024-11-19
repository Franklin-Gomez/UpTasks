import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getOneProject } from "../../api/Project"
import EditProjectForm from "../../components/projects/EditProjectForm"

export default function EditProjectView() {

    const params = useParams()
    const id = params.id!

    const { data , isLoading } = useQuery({
        
        queryKey: ['oneproject' , id ],
        queryFn : () =>  getOneProject( id )

    })

    console.log( data )
    
    if ( data ) return (

        <EditProjectForm
            data={data}
            projectId={id}
        />

    ) 
}
