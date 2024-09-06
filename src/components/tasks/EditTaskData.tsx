import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom"

export default function EditTaskData() {

    const param = useParams()
    const projectId = param.projectId!

    const localtion = useLocation();
    const queryParams = new URLSearchParams(localtion.search)
    const taskId = queryParams.get('editTtask')!

    const { data } = useQuery({
        queryKey : [ 'task' , taskId ],
        queryFn : () =>  getTaskById( {projectId , taskId} )
    })

    console.log( data )

    return (
        <div>
            EditTaskData
        </div>
    )
}
