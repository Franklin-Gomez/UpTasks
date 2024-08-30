import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

export default function AppLayout() {
    return (

        <>

            <header className="bg-gray-800 py-5">
                <div className=" container max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                    
                    <div className=" w-64">
                        
                        <Logo/>

                    </div>

                    <div>

                    </div>
                </div>
            </header>


            <section className=" container max-w-screen-xl mx-auto mt-10 p-5">
                
                <Outlet/>

            </section>

            <footer className="py-5">
                <p className="text-center">
                    Todos los derechos reservados { new Date().getFullYear() }
                </p>
            </footer>
        
        </>

    )
}
