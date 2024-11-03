import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color, size } from 'src/constants'
import { useGlobal } from 'src/hooks'

type Props = {}

const SettingsScreen = (props: Props) => {
    const { handleLogout } = useGlobal();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>PARAMÈTRES</Text>
      <View style={styles.content}>
        <View style={styles.icon}>
            <Image source={require('assets/image/translate.png')} style={styles.image} />
        </View>
        <Text style={styles.title}>Langue</Text>
      </View>

      <TouchableOpacity style={styles.content} onPress={handleLogout}>
        <Text style={styles.deconnexion}>Deconnexion</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',  
        backgroundColor: color.grey,
        paddingTop: size.headerSpacing,
    },
    text: {
        fontSize: 18,
        color: color.white,
        width: size.width - 40,
        opacity: 0.2,
        fontFamily: 'Poppins-Medium',
    },
    content: {
        width: size.width - 40,
        padding: 10,
        borderRadius: size.spacing / 2,
        backgroundColor: color.black,
        marginTop: size.spacing / 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    icon: {
        width: size.spacing * 2,
        height: size.spacing * 2,
        borderRadius: size.spacing / 2,
        backgroundColor: color.grey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: size.spacing,
        height: size.spacing,
    },
    title: {
        fontSize: size.h3,
        color: color.white,
        fontFamily: 'Poppins-Medium',
    },
    deconnexion: {
        fontSize: size.h3,
        color: color.white,
        fontFamily: 'Poppins-Medium',
        padding: size.spacing / 2.5
    }
})