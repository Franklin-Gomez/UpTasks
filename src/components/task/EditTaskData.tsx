import { useQuery } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"
import { getOneTask } from "../../api/Task"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {

    // abrir modal
    const location = useLocation()
    const query = location.search
    const params = new URLSearchParams( query )

    const validate = useParams()
    const projectId = validate.projectId!

    const taskId = params.get("editTask")!

    
    // query = traernos la informacion de la tarea a editar
    const { data }   = useQuery({
        queryKey : ['taskEdit' , taskId ],
        queryFn : () => getOneTask({ projectId , taskId }),
        enabled : !!taskId
    })

    console.log( data )

}
