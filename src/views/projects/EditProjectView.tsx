import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"

export default function EditProjectView() {

    const params   = useParams()

    const projectId = params.projectId! //  para evitar undefined "!"
    
    const { data , isLoading , error , isError} = useQuery({
        queryKey : ['editProject', projectId],
        queryFn : () =>  getProjectById(projectId),
        retry : false //<-- no intenta la conexion varias veces a la api
    })

    return (
        <div>
            EditProjectView
        </div>
    )
}
