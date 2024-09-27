import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"

type NoteDetailsProps = { 
    note : Note
}

export default function NoteDetails({ note } : NoteDetailsProps ) {
    return (
        <div className="p-3 flex justify-between items-center">
            <p>
                {note.content} por <span className="font-bold">{ note.createdBy.name }</span>
            </p>

            <p className="text-xs text-slate-500">
                { formatDate( note.createdAt )}
            </p>
        </div>
    )
}
