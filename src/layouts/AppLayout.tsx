import { Link, Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"

export default function AppLayout() {
    return (

        <div className="bg-gray-200">

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
                        name="D.Gomez"
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

    )
}
