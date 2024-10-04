import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from "@/components/projects/EditProjectForm"

export default function EditProjectView() {

    const params   = useParams()

    const projectId = params.projectId! //  para evitar undefined "!"
    
    const { data , isLoading  , isError} = useQuery({
        queryKey : ['editProject', projectId],
        queryFn : () =>  getProjectById(projectId),
        retry : false //<-- no intenta la conexion varias veces a la api
    })

    if( isLoading ) return 'Cargando...'
    if( isError ) return <Navigate to='/404' />

    if ( data ) return <EditProjectForm data={data} projectId={projectId}/>
}
