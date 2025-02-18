import { Outlet } from "react-router-dom";
import Tabs from "../components/profile/Tabs";

export default function ProfileLayout() {
    return (
        <>

            <Tabs/>
            

            <section className="py-5 mx-auto container px-20 ">

                <Outlet/>

            </section>
        </>
    )
}
