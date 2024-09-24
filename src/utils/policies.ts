import { projectType, TeamMemberType } from "../types";

export const isManager = (managerId : projectType['manager'] , userId : TeamMemberType['_id']) => { 
    return managerId === userId 
}