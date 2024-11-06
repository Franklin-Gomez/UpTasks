import { Outlet } from "react-router-dom"

export default function AppLayout() {
    return (
        <div>
            Desde App Layout

            <Outlet/>
        </div>
    )
}
