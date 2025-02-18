import ProfileForm from "../../components/profile/ProfileForm";
import { userAuth } from "../../hooks/useAuth";

export default function ProfileView() {
    
    const { data , isError } = userAuth()
    
    if(isError) return 'Cargando...'

    if( data ) return (
        <>
           
            <ProfileForm
                userInfo={data}
            />
            
        </>
    )
}
