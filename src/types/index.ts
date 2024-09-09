import { z } from 'zod'

/** Tasks **/

export const taskStatusSchema = z.enum([ "pending" , "onHold" , "inProgress" ,  "underReview" ,  "completed"])

export const taskSchema = z.object({
    _id : z.string(),
    name : z.string(),
    description : z.string(),
    project : z.string(),
    status : taskStatusSchema,
    createdAt : z.string(),
    updatedAt : z.string()
})

export type TaskType = z.infer<typeof taskSchema>
export type TaskFormData = Pick<TaskType , 'name' | 'description'> 


/* Projects */
export const   projectSchema = z.object({ 
    _id : z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})

export const dashboardProjectSchema = z.array(

    projectSchema.pick({
        _id : true,
        projectName : true,
        clientName : true,
        description : true
    })
    
)

// pa la base de datos
export type projectType = z.infer<typeof projectSchema>

// para el formulario
export type projectFormDataType = Pick<projectType , 'projectName' | 'clientName' | 'description' >

