import { getUser } from "../api/Auth";
import { useQuery } from "@tanstack/react-query";

export const userAuth = () => {

    const { data , isError , isLoading } =  useQuery({
        queryKey : ['user'],
        queryFn : getUser,
        retry : 1 ,
        refetchOnWindowFocus : false 
    })

    return { data , isError , isLoading }
} 