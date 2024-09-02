import { z } from 'zod'

/* Projects */
export const   projectSchema = z.object({ 
    _id : z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})

// pa la base de datos
export type projectType = z.infer<typeof projectSchema>

// para el formulario
export type projectFormDataType = Pick<projectType , 'projectName' | 'clientName' | 'description' >

