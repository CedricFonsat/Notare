import { supabase } from "src/supabase";
import { useEffect } from "react";


const useGlobal = () => {

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Erreur de déconnexion:', error.message);
        }
    };

    return {
        handleLogout,
    }
}

export default useGlobal