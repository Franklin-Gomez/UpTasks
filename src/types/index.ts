import { z } from "zod"

export const projectFormSchema = z.object({
    proyectName : z.string(),
    clientName : z.string(),
    description : z.string()
})

export type projectFormType = z.infer<typeof projectFormSchema>;
