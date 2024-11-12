import { useForm } from "react-hook-form"

export default function ProjectForm() {

    const { formState : { errors } , } = useForm()

    return (
        <>
            <div className="bg-white p-6 grid gap-6">

                <div className="flex flex-col">
                    <label htmlFor="proyectoName" className="font-bold text-lg uppercase"> Nombre del Proyecto </label>
                    <input 
                        type="text" 
                        name="proyectoName" 
                        id="proyectoName" 
                        placeholder="Nombre del Proyecto" 
                        className="border border-gray-200 rounded-xl p-3 mt-1"    
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="clienteName" className="font-bold text-lg uppercase" > Nombre del Cliente </label>
                    <input 
                        type="text" 
                        name="clienteName" 
                        id="clienteName" 
                        placeholder="Nombre del Cliente" 
                        className="border border-gray-200 rounded-xl p-3 mt-1"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="descripcionProyecto" className="font-bold text-lg uppercase"> Descripcion </label>
                    <textarea 
                        name="descripcionProyecto" 
                        id="descripcionProyecto" 
                        placeholder="Descripcion del Proyecto" 
                        className="border border-gray-200 rounded-xl p-3 mt-1 h-16 w-full resize-none"
                    />
                </div>

            </div>
            
        </>
    )
}
