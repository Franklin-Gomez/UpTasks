import { useLocation } from "react-router-dom"

export default function EditTaskData() {

    const localtion = useLocation();
    const queryParams = new URLSearchParams(localtion.search)
    const EditTaskData = queryParams.get('editTtask')

    console.log( EditTaskData )

    return (
        <div>
            EditTaskData
        </div>
    )
}
