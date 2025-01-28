import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"

export default function RequestNewCodeView() {


    const { register , formState : { errors } } = useForm({defaultValues : { email : ""}})

    return (
        <>
            <h1 className="text-6xl font-bold text-white">Nuevo Codigo </h1>
        
            <p className="text-gray-400 text-xl mt-2"> Ingresa tu email de registro y poder enviar el nuevo codigo de confirmacion </p>

            <form 
                className="bg-white grid gap-6 p-8 rounded mt-4"
            >

                <div className="grid gap-3">

                    <label htmlFor="email" className="font-bold text-lg uppercase">Email</label>

                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email de Registro"
                        className="border border-gray-200 rounded-xl p-3"
                        {...register("email", { 
                            required: "El email es obligatorio"
                        })}
                    />

                    { errors.email && ( 
                        <ErrorMessage> { errors.email.message }</ErrorMessage>
                    )}

                </div>

            </form>


        </>
    )
}
