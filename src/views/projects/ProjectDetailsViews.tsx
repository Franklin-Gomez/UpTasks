import { useNavigate, useParams } from "react-router-dom"
import { getFullProject } from "@/api/ProjectAPI"
import { useQuery } from "@tanstack/react-query"

import { Navigate , Link } from "react-router-dom"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetail"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"


export default function ProjectDetailsViews() {

    const { data : user  , isLoading : authLoading } = useAuth()

    const params   = useParams()
    const navigate = useNavigate()

    const projectId = params.projectId! //  para evitar undefined "!"
    
    const { data , isLoading , isError} = useQuery({
        queryKey : ['project', projectId],
        queryFn : () =>  getFullProject(projectId),
        retry : false //<-- no intenta la conexion varias veces a la api
    })

    const canEdit = useMemo( () => data?.manager == user?._id , [ data , user ] )

    if( isLoading && authLoading ) return 'Cargando...'
    if( isError ) return <Navigate to='/404' />

    if ( data && user ) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            { isManager( data.manager , user._id ) && ( 
                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate('?newTask=true')}
                    >Agregar Tarea</button>

                    <Link
                        to={'team'} // añadi team a la url actual
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate('?newTask=true')}
                    >Ver Team</Link>
                </nav>  
            )}


            <TaskList
                tasks={data.tasks} 
                canEdit={canEdit}          
            />
            
            <AddTaskModal/>

            <EditTaskData/>

            <TaskModalDetails/>
        </>
    )
}
