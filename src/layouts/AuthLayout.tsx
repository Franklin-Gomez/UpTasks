import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {

    return (

        <div className="bg-gray-800 min-h-screen">
            
            <div className="w-[450px] mx-auto py-14">

                <Logo/> 

                <div className="mt-7">

                    <Outlet/>

                </div>

            </div>
            
            <ToastContainer/>

        </div>



    )
}
