import { z } from "zod"

// NoteSchema -------------------------------------------------------------
export const noteSchema = z.object({
    _id : z.string(),
    content : z.string(),
    createdBy : z.string(),
    task : z.string()
})

export type NoteType = z.infer <typeof noteSchema>
export type NoteFormData = Pick<NoteType , 'content'>

// TasksSchema ----------------------------------------------------------
export const TaskSchema = z.object({
    _id : z.string(),
    description : z.string(),
    name : z.string(),
    projectId : z.string(),
    status : z.string(),
    createdAt : z.string(),
    updatedAt : z.string(),
    notes : z.array( noteSchema )
})

// para los cards
export const tasksSchema = TaskSchema.pick({
    _id : true,
    description : true,
    name : true ,
    status : true
})

// para las notas que mostraremos en el modal de ver tarea
export const tasksNoteSchema = TaskSchema.pick({
    _id : true,
    description : true,
    name : true ,
    status : true,
    notes : true
})

export type taskType = z.infer<typeof tasksSchema>
export type taskFormType = Pick<taskType , "name" | "description">

export const taskstatusSchema = z.enum(["pending", "onHold" , "inProgress" ,  "underReview" ,  "completed"])
export type taskStatusType = z.infer<typeof taskstatusSchema>


// ProjectSchema -------------------------------------------------------------
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


// Auth & user ---------------------------------------------------

export const authSchema  = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string(),
    password_confirmation : z.string(),
    token : z.string()
})

export type AuthType = z.infer<typeof authSchema>

export type userRegisterForm = Pick <AuthType , "name" | "email" | "password" | "password_confirmation"> 
export type loginForm = Pick<AuthType , "email" | "password">
export type confirmtokenType = Pick<AuthType , "token">







