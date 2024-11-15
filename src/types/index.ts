import { z } from "zod"

export const projectSchema = z.object({
    _id : z.string(),
    projectName : z.string(),
    clientName : z.string(),
    description : z.string()
})

// los proyectos
export const projectsSchema = z.array( projectSchema )

// type pa la base de datos
export type projectType = z.infer<typeof projectSchema>;

// type pa la base del formulario
export type projectFormDataType = Pick <projectType , "projectName" | "clientName" | "description">
