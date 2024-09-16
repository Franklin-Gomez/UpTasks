import { z } from 'zod'


/** Auth & Users **/

export const authSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string(),
    password_confirmation : z.string(),
    token : z.string()
})

export type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick <Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick <Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth , 'email'>
export type ForgotPasswordForm = Pick<Auth , 'email'>
export type NewPasswordForm = Pick<Auth , 'password' | 'password_confirmation'>

export type confirmToken = Pick <Auth, 'token'>


/** Tasks **/

export const taskStatusSchema = z.enum([ "pending" , "onHold" , "inProgress" ,  "underReview" ,  "completed"])

export type  taskStatusType = z.infer<typeof taskStatusSchema>

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

