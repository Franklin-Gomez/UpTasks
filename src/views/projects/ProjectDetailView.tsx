import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import TaskList from "../../components/task/TaskList";
import { getFullProject } from "../../api/Project";
import AddTaskModal from "../../components/task/AddTaskModal";
import EditTaskModal from "../../components/task/EditTaskModal";


export default function ProjectDetailView() {

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const { data } = useQuery({
        queryKey : ['project' , projectId],
        queryFn : () => getFullProject(projectId),
        retry : false
    })

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


                </nav>

            </div>

            <TaskList
                tasks={data.tasks}
            />

            <AddTaskModal/>

            <EditTaskModal/>
            
        </>
    )
}
