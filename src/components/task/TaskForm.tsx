import { taskFormType, taskType } from "../../types"
import { FieldErrors , UseFormRegister} from "react-hook-form"
import ErrorMessage from "../ErrorMessage"

type TaskFormProps = { 
    register : UseFormRegister<taskFormType>
    errors: FieldErrors<taskFormType>
    data? : taskType
}

export default function TaskForm( { register , errors , data  } : TaskFormProps) {

    
    return (
        <>
            <div className="bg-white  grid gap-6 ">

                <div className="flex flex-col">
                    <label htmlFor="name" className="font-bold text-lg uppercase"> Nombre de la Tarea </label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Nombre del Proyecto" 
                        className="border border-gray-200 rounded-xl p-3 mt-1"
                        defaultValue={data?.name}
                        {...register("name" , {
                            required : "El Nombre de la Nota es obligatorio"
                        })}   
                    />
                    
                    {errors.name?.message  && 
                        <ErrorMessage>
                            {errors.name.message}
                        </ErrorMessage>
                    }

                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="font-bold text-lg uppercase" > Descripcion  </label>
                    <input 
                        type="text" 
                        id="description" 
                        placeholder="Nombre del Cliente" 
                        className="border border-gray-200 rounded-xl p-3 mt-1"
                        defaultValue={data?.description}
                        {...register("description" , { 
                            required : "La Descripcion de la Tarea es Obligatorio"
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

