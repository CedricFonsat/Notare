import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { color, fonts, size } from 'src/constants';

type Props = {
    text: string;
    onPress: () => void;
    nextButton?: boolean;
}

const Button = ({ text, onPress, nextButton }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
     {nextButton && <Image source={require('assets/image/arrow.png')} style={styles.nextButton} />}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container: {
        width: size.width - 40,
        height: size.spacing * 2.5,
        backgroundColor: color.white,
        borderRadius: size.spacing * 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: size.h3,
        color: color.black,
        fontFamily: 'Poppins-Medium',
    },
    nextButton: {
        width: size.spacing,
        height: size.spacing / 1.5,
        position: 'absolute',
        right: 15,
    }
})