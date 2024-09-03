import { useParams } from "react-router-dom"

export default function EditProjectView() {

    const params   = useParams()
    const projectId = params.perojectId! //  para evitar undefined "!"
    
    return (
        <div>
            EditProjectView
        </div>
    )
}
