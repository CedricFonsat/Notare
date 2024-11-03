import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "src/supabase";

const useLogin = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Erreur de connexion', error.message);
      }
    };

    useEffect(() => {
        // Vérifier l'état de l'utilisateur lors du chargement de l'application
        const session = supabase.auth.getSession();
        setIsLoggedIn(!!session);
    
        // Écouter les changements de connexion
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (event === 'SIGNED_IN') {
              setIsLoggedIn(true);
            } else if (event === 'SIGNED_OUT') {
              setIsLoggedIn(false);
            }
          }
        );
    
        return () => {
          authListener?.subscription.unsubscribe();
        };
      }, []);

      return {
        isLoggedIn,
        handleLogin,
        email,
        setEmail,
        password,
        setPassword,
      }
}

export default useLogin