import { Link, Navigate, Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { userAuth } from "../hooks/useAuth"


export default function AppLayout() {

    const { data , isError , isLoading } = userAuth()

    if (isLoading ) return 'Cargando...'

    if( isError ) { 
        return <Navigate to={'/auth/login'}/>
    }

    if (data ) return (

        <>
            <div className="bg-gray-200 h-screen">

                <header className="py-5 bg-gray-800">

                    <div className="flex justify-between items-center  container mx-auto align-middle">

                        <div className="w-64">

                            <Link
                                to={'/'}
                            >
                                <Logo/>

                            </Link>

                        </div>

                        <NavMenu
                            data={ data}
                        />

                    </div>
                    

                </header>


                <section className="py-5 mx-auto container px-20 ">

                    <Outlet/>

                </section>

                <footer className="py-5 ">
                    <p className="text-center"> Todos los Derechos reservados </p>
                </footer>

            </div>

            <ToastContainer/>

        </>

    )
}
