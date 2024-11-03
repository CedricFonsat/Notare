import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import * as FileSystem from 'expo-file-system';

// hooks/useAudioPlayer.ts
export const useAudioPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAudioUri, setCurrentAudioUri] = useState<string | null>(null);
  
    useEffect(() => {
      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [sound]);
  
    const playAudio = async (uri: string) => {
      try {
        // Vérifie si le fichier existe avant de le lire
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          console.log('Fichier audio non trouvé:', uri);
          return;
        }
  
        // Si un son est déjà en cours, on l'arrête
        if (sound) {
          await sound.unloadAsync();
        }
  
        // Si on joue le même audio, on le met en pause
        if (currentAudioUri === uri && isPlaying) {
          await sound?.pauseAsync();
          setIsPlaying(false);
          return;
        }
  
        // Configure l'audio mode pour la lecture
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
  
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true },
          (status) => {
            if (status.isLoaded) {
              setIsPlaying(!status.didJustFinish);
            }
          }
        );
  
        setSound(newSound);
        setCurrentAudioUri(uri);
        setIsPlaying(true);
      } catch (error) {
        console.error('Erreur lors de la lecture audio:', error);
        setIsPlaying(false);
      }
    };
  
    const stopAudio = async () => {
      try {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
          setSound(null);
          setIsPlaying(false);
          setCurrentAudioUri(null);
        }
      } catch (error) {
        console.error('Erreur lors de l\'arrêt audio:', error);
      }
    };
  
    return {
      playAudio,
      stopAudio,
      isPlaying,
      currentAudioUri,
    };
  };