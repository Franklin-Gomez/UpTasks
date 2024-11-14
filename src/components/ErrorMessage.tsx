
type ErrorMessageProps = { 
    children : React.ReactNode
}

export default function ErrorMessage( { children } : ErrorMessageProps ) {

    return (

        <div className="bg-red-500 py-2 my-1">

            <p className="uppercase text-center text-white font-bold"> { children } </p>

        </div>

    )

}
