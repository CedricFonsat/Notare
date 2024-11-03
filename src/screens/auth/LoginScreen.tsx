import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useLogin } from 'src/hooks';

const LoginScreen = () => {
    const { handleLogin, email, setEmail, password, setPassword } = useLogin();
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
            <Text>Connexion</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ marginVertical: 8, borderWidth: 1, padding: 8 }}
            />
            <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ marginVertical: 8, borderWidth: 1, padding: 8 }}
            />
            <Button title="Se connecter" onPress={handleLogin} />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})