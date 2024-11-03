import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts } from 'src/constants'

type Props = {}

const OnboardingScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
      <Text style={styles.bottomTitle}>Notare, mon application de prise de notes optimisée pour moi.</Text>
      <Text style={styles.bottomSubtitle}>Une prise de notes simple et rapide pour freelances et créatifs.</Text>
      </View>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        width: 300,
        height: 200,
        borderWidth: 1,
        borderColor: 'white',
    },
    bottomTitle: {
        fontSize: 20,
        color: 'white',
        fontFamily: fonts.PoppinsBold,
    },
    bottomSubtitle: {
        fontSize: 16,
        color: 'white',
        fontFamily: fonts.PoppinsRegular,
    }
})