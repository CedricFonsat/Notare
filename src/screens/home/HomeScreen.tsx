import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useGlobal } from 'src/hooks';
import { color, fonts } from 'src/constants';
import { AudioRecorderStorage, Header } from 'src/components';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {

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
  
  return (
    <View style={styles.container}>
       <Header text='Notare'/>
       <Text style={{ fontFamily: fonts.PoppinsBlack, fontSize: 30, color: 'white' }}>Mes notes</Text>
       <AudioRecorderStorage />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.black,
  }
})