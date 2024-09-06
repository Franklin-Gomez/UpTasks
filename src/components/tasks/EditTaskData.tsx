import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal";
import { Navigate } from "react-router-dom";

export default function EditTaskData() {

    const param = useParams()
    const projectId = param.projectId!

    const localtion = useLocation();
    const queryParams = new URLSearchParams(localtion.search)
    const taskId = queryParams.get('editTtask')!

    const { data , isError } = useQuery({
        queryKey : [ 'task' , taskId ],
        queryFn : () =>  getTaskById( {projectId , taskId} ),
        enabled : !!taskId // conviernte taskkId en boolean
    })

    if( isError ) return <Navigate to={'/404 '}/>

    if( data ) return <EditTaskModal data={data} taskId={taskId} />
}
