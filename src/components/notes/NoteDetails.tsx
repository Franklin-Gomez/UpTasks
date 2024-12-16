import { NoteType } from "../../types"

export default function NoteDetails(  { nota }  : { nota : NoteType } ) {
    
    return (
        <>
            <p>{nota.content}</p>
        </>
    )
}
