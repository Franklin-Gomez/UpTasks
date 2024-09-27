import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMemo } from "react"

type NoteDetailsProps = { 
    note : Note
}

export default function NoteDetails({ note } : NoteDetailsProps ) {

    const { data , isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id , [ data ])

    if( isLoading ) return 'Cargando...'

    return (
        <div className="p-3 flex justify-between items-center">
            <p>
                {note.content} por <span className="font-bold">{ note.createdBy.name }</span>
            </p>

            <p className="text-xs text-slate-500">
                { formatDate( note.createdAt )}
            </p>
            
            { canDelete && ( 
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor pointer transition-colors"
                > Eliminar</button>
            )}

        </div>

    )
}
