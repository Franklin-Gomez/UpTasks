import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import TaskList from "../../components/task/TaskList";
import { getFullProject } from "../../api/Project";
import AddTaskModal from "../../components/task/AddTaskModal";
import EditTaskModal from "../../components/task/EditTaskModal";
import TaskModalDetails from "../../components/task/TaskDetailsModal";
import { userAuth } from "../../hooks/useAuth";
import { useMemo } from "react";

export default function ProjectDetailView() {

    
    const userData = userAuth()
    const navigate = useNavigate()
    const params = useParams()

    const projectId = params.projectId!

    const { data } = useQuery({
        queryKey : ['project' , projectId],
        queryFn : () => getFullProject(projectId),
        retry : false
    })

    const canEdit = useMemo(() => userData.data?._id ==  data?.manager , [ userData.data , data ])

    if( data ) return (
        <>
            <div className=" grid gap-3">

                <h1 className="text-6xl font-bold"> Tareas De   </h1>

                <p className="text-gray-500 font-light text-3xl">  </p>

                <nav className="my-2 flex gap-2">

                    <Link
                        to={'/'}
                        className="bg-purple-400 text-white px-4 py-2 font-bold text-2xl hover:bg-purple-700 cursor-pointer"
                    >
                        Inicio
                    </Link>

                    <button
                        className="bg-purple-400 text-white px-4 py-2 font-bold text-2xl hover:bg-purple-700 cursor-pointer"
                        onClick={() => navigate('?newTask=true')}
                    >
                        Crear Tarea
                    </button>

                    <Link
                        to={'team'} // añadi team a la url actual
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate('?newTask=true')}
                    >Ver Team</Link>


                </nav>

            </div>

            <TaskList
                tasks={data.tasks}
                canEdit={canEdit}
            />

            <AddTaskModal/>

            <EditTaskModal/>

            <TaskModalDetails/>
            
        </>
    )
}
