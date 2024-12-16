import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"

export default function AddNoteForm() {
    
    // form 
    const { register , formState : { errors } , handleSubmit  } = useForm()

    const handleCreateNote = () => { 

    }

    return (
        
        <div>
            
            <form onSubmit={ handleSubmit( handleCreateNote )}>

                <div className="grid py-2 gap-2">

                    <label htmlFor="nota" className="font-bold">Crear Nota : </label>
                    <input type="text" id="nota" placeholder="Contenito de la  Nota " className="w-full p-3 bg-white border border-gray-300"
                    {...register("nota" , { 
                        required : "El  Contenido de la Nota es boligatorio"
                    })}/>

                    { errors.nota && <ErrorMessage>{errors.nota.message?.toString()}</ErrorMessage> }

                </div>

                <input type="submit" value="Crear Nota" className="bg-purple-400 text-white py-2 font-bold text-2xl hover:bg-purple-700 cursor-pointer w-full rounded-xl mt-6" />
                
            </form>

        </div>
    )
}
