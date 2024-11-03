import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color, fonts, size } from 'src/constants'

type Props = {
    text: string;
}

const Header = ({ text }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={require('assets/image/logo.png')} style={styles.logo} />
      <Text style={styles.title}>{text}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: size.width,
        height: size.headerSpacing,
        paddingHorizontal: size.spacing,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: size.headerSpacing
    },
    title: {
        fontSize: size.h2,
        color: color.white,
        fontWeight: 'bold',
        fontFamily: fonts.PoppinsBold,
        marginLeft: size.spacing / 4
    },
    logo: {
        width: size.spacing * 2.5,
        height: size.spacing ,
    }
})