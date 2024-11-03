import { supabase } from "src/supabase";
import { useNavigation } from "@react-navigation/native";

const useGlobal = () => {

    const navigation = useNavigation<any>();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Erreur de déconnexion:', error.message);
        }
    };

    const handleMenu = () => {
        navigation.navigate('Settings');
    }

    return {
        handleLogout,
        handleMenu
    }
}

export default useGlobal