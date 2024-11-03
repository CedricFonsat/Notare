import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useGlobal } from 'src/hooks';
import { color, fonts } from 'src/constants';
import { AudioRecorderStorage, Header } from 'src/components';

const HomeScreen = () => {
    const { handleLogout } = useGlobal();
  
  return (
    <View style={styles.container}>
       <Header text='Notare'/>
       <Text style={{ fontFamily: fonts.PoppinsBlack, fontSize: 30, color: 'white' }}>Inter Black</Text>
       {/* <AudioRecorderStorage /> */}
      <Text>Bienvenue dans l'application !</Text>

      <Button title="Se déconnecter" onPress={handleLogout} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.primary,
  }
})