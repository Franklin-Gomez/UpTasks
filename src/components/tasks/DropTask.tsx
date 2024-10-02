import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status : string
}

export default function DropTask({ status } : DropTaskProps) {

    // setNodeRef - indica que elemento estetico va a tener la funcionalidad
    const { isOver , setNodeRef  } = useDroppable({
        id : status
    })

    return (

        <div
            ref={setNodeRef}
            className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500"

        > Soltar Tarea Aqui - { status } </div>

    )
}
