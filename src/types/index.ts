import { z } from "zod"

export const projectSchema = z.object({
    _id : z.string(),
    projectName : z.string(),
    clientName : z.string(),
    description : z.string()
})

// type pa la base de datos
export type projectFormType = z.infer<typeof projectSchema>;

// type pa la base del formulario
export type projectFormDataType = Pick <projectFormType , "projectName" | "clientName" | "description">
