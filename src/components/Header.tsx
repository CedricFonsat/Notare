import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color, fonts, size } from 'src/constants'
import { useGlobal } from 'src/hooks';

type Props = {
    text: string;
}

const Header = ({ text }: Props) => {
    const { handleMenu } = useGlobal();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      {/* <Image source={require('assets/image/logo.png')} style={styles.logo} /> */}
      <Text style={styles.title}>{text}</Text>
      </View>
      <TouchableOpacity onPress={handleMenu}>
      <Image source={require('assets/image/menu.png')} style={styles.burger} />
      </TouchableOpacity>
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
        marginTop: size.headerSpacing,
        justifyContent: 'space-between',
        marginBottom: size.spacing * 2,
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
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    burger: {
        width: size.spacing * 1.5,
        height: size.spacing * 1.5,
    }
})