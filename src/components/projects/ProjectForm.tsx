import { projectFormDataType, projectType } from "../../types"
import { FieldErrors , UseFormRegister} from "react-hook-form"
import ErrorMessage from "../ErrorMessage"

type ProjectFormProps = { 
    errors :  FieldErrors<projectFormDataType>
    register : UseFormRegister<projectFormDataType>
    data? : projectType
}

export default function ProjectForm( { errors , register , data } : ProjectFormProps) {


    return (
        <>
            <div className="bg-white  grid gap-6 ">

                <div className="flex flex-col">
                    <label htmlFor="projectName" className="font-bold text-lg uppercase"> Nombre del Proyecto </label>
                    <input 
                        type="text" 
                        id="projectName" 
                        placeholder="Nombre del Proyecto" 
                        className="border border-gray-200 rounded-xl p-3 mt-1"
                        defaultValue={data?.projectName}
                        {...register("projectName" , {
                            required : "El Nombre del Proyecto es Obligatorio"
                        })}   
                    />
                    
                    {errors.projectName?.message  && 
                        <ErrorMessage>
                            {errors.projectName.message}
                        </ErrorMessage>
                    }

                </div>

                <div className="flex flex-col">
                    <label htmlFor="clientName" className="font-bold text-lg uppercase" > Nombre del Cliente </label>
                    <input 
                        type="text" 
                        id="clientName" 
                        placeholder="Nombre del Cliente" 
                        className="border border-gray-200 rounded-xl p-3 mt-1"
                        defaultValue={data?.clientName}
                        {...register("clientName" , { 
                            required : "El Nombre del Cliente es obligatorio"
                        })}
                    />

                    {errors.clientName?.message  && 
                        <ErrorMessage>
                            {errors.clientName.message}
                        </ErrorMessage>
                    }

                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="font-bold text-lg uppercase"> Descripcion </label>
                    <textarea 
                        id="description" 
                        placeholder="Descripcion del Proyecto" 
                        className="border border-gray-200 rounded-xl p-3 mt-1 h-16 w-full resize-none"
                        defaultValue={data?.description}
                        { ...register("description" , { 
                            required : "La Descripcion del proyecto es obligatorio"
                        })}
                    />  

                    {errors.description?.message  && 
                        <ErrorMessage>
                            {errors.description.message}
                        </ErrorMessage>
                    }

                </div>

            </div>
            
        </>
    )
}
