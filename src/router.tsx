import { BrowserRouter , Route , Routes} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import CreateProjectView from './views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailsViews from './views/projects/ProjectDetailsViews'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/auth/LoginView'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'

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

                // auth
                <Route element={<AuthLayout/> }>
                    <Route index path='/auth/login' element={<LoginView/>}/>
                    <Route path='/auth/register' element={<RegisterView/>}/>
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView/>}/>
                    <Route path='/auth/request-code' element={<RequestNewCodeView/>}/>
                </Route>
            </Routes>
        
        </BrowserRouter>
    )
}