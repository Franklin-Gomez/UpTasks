import { NoteType } from "../../types"
import AddNoteForm from "./AddNoteForm"
import NoteDetails from "./NoteDetails"

type NotesPanelProps = {
    notes : NoteType[]
}

export default function NotesPanel( { notes } : NotesPanelProps) {


    return (

        <>
            <AddNoteForm/>

            <div>

                { notes.length ? ( 
                    <>
                        <p className="font-bold text-2xl text-slate-600 my-5">Notas : </p>
                        { notes.map( nota =>  
                            <NoteDetails nota={nota} key={nota._id} />
                        )}
                    </>
                ) : 

                    <p className="text-gray-500 text-center pt-3">No Hay Notas</p>
            
                }

            </div>

        </>

    )

}
