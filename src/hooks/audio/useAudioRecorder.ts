// hooks/useAudioRecorder.ts
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { Recording } from 'expo-av/build/Audio';
import * as FileSystem from 'expo-file-system';

export const useAudioRecorder = () => {
    const [recording, setRecording] = useState<Recording | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingUri, setRecordingUri] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState(false);
  
    useEffect(() => {
      // Vérifier les permissions au montage
      checkPermissions();
      // Cleanup au démontage
      return () => {
        if (recording) {
          recording.stopAndUnloadAsync();
        }
      };
    }, []);
  
    const checkPermissions = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Erreur lors de la vérification des permissions:', error);
      }
    };
  
    const startRecording = async () => {
      try {
        if (!hasPermission) {
          await checkPermissions();
          if (!hasPermission) {
            console.log('Permissions audio non accordées');
            return;
          }
        }
  
        // Configure l'audio mode avant l'enregistrement
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false, // évite les problèmes en arrière-plan
          shouldDuckAndroid: true,
        });
  
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
  
        setRecording(recording);
        setIsRecording(true);
      } catch (err) {
        console.error('Erreur lors du démarrage de l\'enregistrement:', err);
        setIsRecording(false);
      }
    };
  
    const stopRecording = async () => {
      if (!recording) return;
  
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        
        // Vérifie si le fichier existe
        if (uri) {
          const fileInfo = await FileSystem.getInfoAsync(uri);
          if (fileInfo.exists) {
            setRecordingUri(uri);
          }
        }
        
        setIsRecording(false);
        setRecording(null);
  
        // Réinitialise l'audio mode
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
      } catch (err) {
        console.error('Erreur lors de l\'arrêt de l\'enregistrement:', err);
        setIsRecording(false);
        setRecording(null);
      }
    };
  
    return {
      isRecording,
      recordingUri,
      hasPermission,
      startRecording,
      stopRecording,
    };
  };