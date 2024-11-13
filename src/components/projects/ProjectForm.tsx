import { projectFormType } from "../../types"
import { FieldErrors , UseFormRegister} from "react-hook-form"

type ProjectFormProps = { 
    errors :  FieldErrors<projectFormType>
    register : UseFormRegister<projectFormType>
}

export default function ProjectForm( { errors , register } : ProjectFormProps) {


    return (
        <>
            <div className="bg-white  grid gap-6 ">

                <div className="flex flex-col">
                    <label htmlFor="proyectName" className="font-bold text-lg uppercase"> Nombre del Proyecto </label>
                    <input 
                        type="text" 
                        id="proyectName" 
                        placeholder="Nombre del Proyecto" 
                        className="border border-gray-200 rounded-xl p-3 mt-1" 
                        {...register("proyectName" , {
                            required : "El Nombre del Proyecto es Obligatorio"
                        })}   
                    />

                </div>

                <div className="flex flex-col">
                    <label htmlFor="clientName" className="font-bold text-lg uppercase" > Nombre del Cliente </label>
                    <input 
                        type="text" 
                        id="clientName" 
                        placeholder="Nombre del Cliente" 
                        className="border border-gray-200 rounded-xl p-3 mt-1"
                        {...register("clientName" , { 
                            required : "El Nombre del Cliente es obligatorio"
                        })}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="font-bold text-lg uppercase"> Descripcion </label>
                    <textarea 
                        id="description" 
                        placeholder="Descripcion del Proyecto" 
                        className="border border-gray-200 rounded-xl p-3 mt-1 h-16 w-full resize-none"
                        { ...register("description" , { 
                            required : "La Descripcion del proyecto es obligatorio"
                        })}
                    />
                </div>

            </div>
            
        </>
    )
}
