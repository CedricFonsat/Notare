import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useNotification = () => {
  const navigation = useNavigation<any>();

  const redirectTo = (screen: string) => {
    navigation.navigate(screen);
  }

  const goBack = () => {
    navigation.goBack();
    AsyncStorage.setItem('@notification_completed', 'false');
  }

  // Set notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
      AsyncStorage.setItem('@notification_completed', 'true');
    }

    // Utilise expo-notifications pour demander les permissions
  const { status } = await Notifications.requestPermissionsAsync();
  if (status === 'granted') {
    // Redirige vers l'écran précédent après avoir accordé les permissions
    navigation.goBack();
    await AsyncStorage.setItem('@notification_completed', 'true');
  } else {
    // Affiche une alerte et ne redirige pas
    alert('Permission refusée!');
    await AsyncStorage.setItem('@notification_completed', 'false');
  }
  }

  return {
    registerForPushNotificationsAsync,
    redirectTo,
    goBack
  }
}
