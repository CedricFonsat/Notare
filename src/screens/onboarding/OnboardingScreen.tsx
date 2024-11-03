import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color, fonts, size } from 'src/constants'
import { Button } from 'src/components'

type Props = {}

const OnboardingScreen = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={require('assets/image/onboarding.png')} style={styles.logo} />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomTitle}>Notare, mon application de prise de notes optimisée pour moi.</Text>
                <Text style={styles.bottomSubtitle}>Une prise de notes simple et rapide pour freelances et créatifs.</Text>
                <Button text="Commencer" onPress={() => console.log('onPress')} nextButton={true} />
            </View>
        </View>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color.black,
        paddingBottom: size.spacing,
        paddingTop: size.headerSpacing
    },
    bottomContainer: {
        width: size.width - 40,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    bottomTitle: {
        fontSize: 20,
        color: 'white',
        fontFamily: fonts.PoppinsBold,
        textAlign: 'center',
    },
    bottomSubtitle: {
        fontSize: 16,
        color: 'white',
        fontFamily: fonts.PoppinsRegular,
        textAlign: 'center',
        marginBottom: size.spacing,
    },
    topContainer: {
        width: size.width - 40,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: size.spacing * 12,
        resizeMode: 'contain',
        aspectRatio: 1,
    }
})