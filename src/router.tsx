import { BrowserRouter , Routes , Route } from "react-router-dom"
import DashboardViews from "./views/DashboardViews"
import AppLayout from "./layouts/AppLayout"
import CreateProjectView from "./views/projects/CreateProjectView"
import EditProjectView from "./views/projects/EditProjectView"

export default function Router() {

  return (

    <BrowserRouter>

      <Routes>

        <Route element={<AppLayout/>}>

          <Route index path="/" element={<DashboardViews/>}/>
          <Route path="/projects/createProject" element={<CreateProjectView/>}/>
          <Route path="/projects/:id/editProject" element={<EditProjectView/>}/>

        </Route>

      </Routes>
    
    </BrowserRouter>

  )
}

