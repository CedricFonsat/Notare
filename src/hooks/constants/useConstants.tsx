import { supabase } from "src/supabase";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const useConstants = () => {

    const [loaded, error] = useFonts({
        'Poppins-Black': require('assets/fonts/Poppins/Poppins-Black.ttf'),
        'Poppins-Regular': require('assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Bold': require('assets/fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-SemiBold': require('assets/fonts/Poppins/Poppins-SemiBold.ttf'),
        'Poppins-Medium': require('assets/fonts/Poppins/Poppins-Medium.ttf'),
        'Poppins-Light': require('assets/fonts/Poppins/Poppins-Light.ttf'),
      });

    useEffect(() => {
        if (loaded || error) {
          SplashScreen.hideAsync();
        }
      }, [loaded, error]);
    
      if (!loaded && !error) {
        return null;
      }

      const Fonts = () => {
        return {
            PoppinsBlack: 'Poppins-Black',
            PoppinsRegular: 'Poppins-Regular',
            PoppinsBold: 'Poppins-Bold',
            PoppinsSemiBold: 'Poppins-SemiBold',
            PoppinsMedium: 'Poppins-Medium',
            PoppinsLight: 'Poppins-Light',
        }
      }

      return {
        Fonts
      }
}

export default useConstants