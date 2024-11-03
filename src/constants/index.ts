import { Dimensions } from "react-native"
import Constants from 'expo-constants';

export const color = {
    primary: '#090E1A',
    secondary: '#090E1A',
    general: '#34b67f',
    white: '#FFFFFF',
    black: '#000000',
    grey: '#1C1C1E',
    border: "#2b2c33",
    player: "#131823"
}

export const size = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    headerSpacing: Constants.statusBarHeight,
    spacing: 20,
    h1: 32,
    h2: 24,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14,
    caption: 12,
}

export const fonts = {
    PoppinsBlack: 'Poppins-Black',
    PoppinsRegular: 'Poppins-Regular',
    PoppinsBold: 'Poppins-Bold',
    PoppinsSemiBold: 'Poppins-SemiBold',
    PoppinsMedium: 'Poppins-Medium',
    PoppinsLight: 'Poppins-Light',
}