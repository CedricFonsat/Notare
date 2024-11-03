import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { color } from 'src/constants'
import { useLogin } from 'src/hooks'
import { StatusBar } from 'expo-status-bar'

type Props = {}

const SplashScreen = (props: Props) => {
    const navigation = useNavigation<any>();
    const { isLoggedIn } = useLogin();

    useEffect(() => {
        AsyncStorage.getItem('@notare_onboarding_storage').then((value) => {
            if(value){
                navigation.replace('Home');
            }else{
                navigation.replace('Onboarding');
                AsyncStorage.setItem('@notare_onboarding_storage', 'true');
            }
        })
      }, [navigation]);

  return (
   <View style={styles.container}>
       <View>
           <Image source={require('assets/image/logo.png')} style={styles.image} />
           <ActivityIndicator size="large" color={color.white} style={styles.indicator} />
       </View>
       <Text style={styles.made}>Made by Cedric Fonsat</Text>
   </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    image: {
        height: 100,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    content:{
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden'
    },
    indicator: {
        marginTop: 20
    },
    made: {
        fontSize: 12,
        color: color.white,
        fontFamily: 'Poppins-Medium',
        marginTop: 20,
        position: 'absolute',
        bottom: 30,
    }
})