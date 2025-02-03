import { BrowserRouter , Routes , Route } from "react-router-dom"
import DashboardViews from "./views/DashboardViews"
import AppLayout from "./layouts/AppLayout"
import CreateProjectView from "./views/projects/CreateProjectView"
import EditProjectView from "./views/projects/EditProjectView"
import ProjectDetailView from "./views/projects/ProjectDetailView"
import AuthLayout from "./layouts/AuthLayout"
import LoginView from "./views/auth/LoginView"
import RegisterView from "./views/auth/RegisterView"
import NewPasswordView from "./views/auth/NewPasswordView"
import ConfirmAccount from "./views/auth/ConfirmAccount"
import RequestNewCodeView from "./views/auth/RequestNewCodeView"
import ForgotPasswordView from "./views/auth/ForgotPasswordView"

export default function Router() {

  return (

    <BrowserRouter>

      <Routes>

        <Route element={<AppLayout/>}>

          <Route index path="/" element={<DashboardViews/>}/>
          <Route path="/projects/createProject" element={<CreateProjectView/>}/> 
          <Route path="/projects/:projectId/editProject" element={<EditProjectView/>}/>
          <Route path="/projects/:projectId/" element={<ProjectDetailView/>}/> 

        </Route>

        <Route element={<AuthLayout/>}>

          <Route index path='/auth/login' element={<LoginView/>}/>
          <Route path='/auth/register' element={<RegisterView/>}/>
          <Route path='/auth/forgot-password' element={<ForgotPasswordView/>}/>
          <Route path='/auth/confirm-account' element={<ConfirmAccount/>}/>
          <Route path='/auth/request-code' element={<RequestNewCodeView/>}/>
          <Route path='/auth/new-password/' element={<NewPasswordView/>}/>

        </Route>

      </Routes>
    
    </BrowserRouter>

  )
}

