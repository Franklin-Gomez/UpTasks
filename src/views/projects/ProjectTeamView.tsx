import { Link, useNavigate, useParams } from "react-router-dom";
import AddMemberModal from "../../components/team/AddMemberModal";

export default function ProjectTeamView() {

    const navigate = useNavigate()

    const params = useParams()

    return (
        <>
            <div className=" grid gap-3">

                <h1 className="text-6xl font-bold"> Administrar Equipo </h1>

                <p className="text-gray-500 font-light text-3xl"> Administra el Equipo  de trabajo de este Proyecto </p>

                <nav className="my-2 flex gap-2">

                    <Link
                        to={'/'}
                        className="bg-purple-400 text-white px-4 py-2 font-bold text-2xl hover:bg-purple-700 cursor-pointer"
                    >
                        Inicio
                    </Link>

                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={ () => navigate('?addMember=true') }
                    >Agregar Colaborador</button>

                </nav>

            </div>


            <AddMemberModal/>
        </>

    )
}
