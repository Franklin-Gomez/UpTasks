import { z } from "zod"

// TasksSchema
export const TaskSchema = z.object({
    _id : z.string(),
    description : z.string(),
    name : z.string(),
    projectId : z.string(),
    status : z.string(),
    createdAt : z.string(),
    updatedAt : z.string()
})

export const tasksSchema = TaskSchema.pick({
    _id : true,
    description : true,
    name : true ,
    status : true
})

export type taskType = z.infer<typeof tasksSchema>


// ProjectSchema
export const projectSchema = z.object({
    _id : z.string(),
    projectName : z.string(),
    clientName : z.string(),
    description : z.string(),
    tasks : z.array( tasksSchema )
})

// los proyectos
export const projectsSchema = z.array( projectSchema )

// type pa la base de datos
export type projectType = z.infer<typeof projectSchema>;

// type pa la base del formulario
export type projectFormDataType = Pick <projectType , "projectName" | "clientName" | "description">






