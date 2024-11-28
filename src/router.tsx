import { BrowserRouter , Routes , Route } from "react-router-dom"
import DashboardViews from "./views/DashboardViews"
import AppLayout from "./layouts/AppLayout"
import CreateProjectView from "./views/projects/CreateProjectView"
import EditProjectView from "./views/projects/EditProjectView"
import ProjectDetailView from "./views/projects/ProjectDetailView"

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

      </Routes>
    
    </BrowserRouter>

  )
}

