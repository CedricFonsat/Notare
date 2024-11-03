import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, HomeScreen, OnboardingScreen, SettingsScreen, SplashScreen } from 'src/screens';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{
            presentation: 'modal',
          }}/>
           <Stack.Screen name="Onboarding" component={OnboardingScreen} />
           <Stack.Screen name="Login" component={LoginScreen} />   
           <Stack.Screen name="Splash" component={SplashScreen} />   
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;