import { BrowserRouter , Route , Routes} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import CreateProjectView from './views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailsViews from './views/projects/ProjectDetailsViews'

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>

                    <Route index path='/' element={<DashboardView/>} />
                    <Route path='/projects/create' element={<CreateProjectView/>} />
                    <Route path='/projects/:projectId' element={<ProjectDetailsViews/>} />
                    <Route path='/projects/:projectId/edit' element={<EditProjectView/>} />

                </Route>
            </Routes>
        
        </BrowserRouter>
    )
}