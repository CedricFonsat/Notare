// hooks/useAudioStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { useState, useEffect } from 'react';
import { AudioNote } from 'src/types';

const STORAGE_KEY = '@audio_notes';

export const useAudioStorage = () => {
  const [audioNotes, setAudioNotes] = useState<AudioNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const storedNotes = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        // Vérifie que les fichiers audio existent toujours
        const validNotes = await Promise.all(
          parsedNotes.map(async (note: AudioNote) => {
            const fileInfo = await FileSystem.getInfoAsync(note.audio_url);
            return fileInfo.exists;
          })
        );
        const filteredNotes = parsedNotes.filter((_: AudioNote, index: number) => validNotes[index]);
        setAudioNotes(filteredNotes);
        
        // Si des notes ont été filtrées, met à jour le stockage
        if (filteredNotes.length !== parsedNotes.length) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNoteTitle = async (id: string, newTitle: string) => {
    try {
      // Vérifie que le nouveau titre n'est pas vide
      if (!newTitle.trim()) {
        throw new Error('Le titre ne peut pas être vide');
      }

      // Trouve la note et vérifie qu'elle existe toujours
      const noteToUpdate = audioNotes.find(note => note.id === id);
      if (!noteToUpdate) {
        throw new Error('Note non trouvée');
      }

      // Vérifie que le fichier audio existe toujours
      const fileInfo = await FileSystem.getInfoAsync(noteToUpdate.audio_url);
      if (!fileInfo.exists) {
        throw new Error('Fichier audio non trouvé');
      }

      // Met à jour la note
      const updatedNotes = audioNotes.map(note =>
        note.id === id 
          ? { 
              ...note, 
              title: newTitle.trim(),
              updatedAt: new Date().toISOString() // Optionnel: ajoute une date de mise à jour
            } 
          : note
      );

      // Sauvegarde dans le stockage local
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
      
      // Met à jour l'état
      setAudioNotes(updatedNotes);

      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du titre:', error);
      throw error;
    }
  };

  const saveNote = async (note: AudioNote) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(note.audio_url);
      if (!fileInfo.exists) {
        throw new Error('Fichier audio non trouvé');
      }

      // Copie le fichier dans un dossier permanent
      const permanentDir = `${FileSystem.documentDirectory}audio/`;
      await FileSystem.makeDirectoryAsync(permanentDir, { intermediates: true });
      
      const fileName = `audio_${Date.now()}.m4a`;
      const permanentUri = `${permanentDir}${fileName}`;
      
      await FileSystem.copyAsync({
        from: note.audio_url,
        to: permanentUri
      });

      // Met à jour l'URI avec l'emplacement permanent
      const noteWithPermanentUri = {
        ...note,
        audioUri: permanentUri
      };

      const updatedNotes = [...audioNotes, noteWithPermanentUri];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
      setAudioNotes(updatedNotes);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la note:', error);
      throw error;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const noteToDelete = audioNotes.find(note => note.id === id);
      if (noteToDelete) {
        // Supprime le fichier audio
        const fileInfo = await FileSystem.getInfoAsync(noteToDelete.audio_url);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(noteToDelete.audio_url);
        }
      }

      const updatedNotes = audioNotes.filter(note => note.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
      setAudioNotes(updatedNotes);
    } catch (error) {
      console.error('Erreur lors de la suppression de la note:', error);
      throw error;
    }
  };

  return {
    audioNotes,
    isLoading,
    saveNote,
    updateNoteTitle,
    deleteNote,
    loadNotes,
  };
};