// components/AudioRecorder.tsx
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AudioListItem } from './AudioListItem';
import { AudioNote } from 'src/types';
import { useAudioPlayer, useAudioRecorder, useAudioStorage } from 'src/hooks';

const AudioRecorderStorage: React.FC = () => {
    const { isRecording, recordingUri, hasPermission, startRecording, stopRecording } = useAudioRecorder();
    const { audioNotes, isLoading, saveNote, updateNoteTitle, deleteNote } = useAudioStorage();
    const { playAudio, stopAudio, isPlaying, currentAudioUri } = useAudioPlayer();
    const [error, setError] = useState<string | null>(null);
  
    const handleSaveRecording = async () => {
      try {
        if (!recordingUri) return;
  
        const newNote: AudioNote = {
          id: Date.now().toString(),
          title: `Note vocale ${new Date().toLocaleString()}`,
          audio_url: recordingUri,
          created_at: new Date().toISOString(),
          user_id: "user-123"
        };
  
        await saveNote(newNote);
        setError(null);
      } catch (err) {
        setError('Erreur lors de la sauvegarde de l\'enregistrement');
        console.error(err);
      }
    };
  
    if (!hasPermission) {
      return (
        <View style={styles.container}>
          <Text>Permission d'accès au microphone requise</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
  
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordingButton]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? 'Arrêter l\'enregistrement' : 'Démarrer l\'enregistrement'}
          </Text>
        </TouchableOpacity>
  
        {recordingUri && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveRecording}
          >
            <Text style={styles.buttonText}>Sauvegarder l'enregistrement</Text>
          </TouchableOpacity>
        )}
  
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView style={styles.notesList}>
            {audioNotes.map(note => (
              <AudioListItem
                key={note.id}
                note={note}
                isPlaying={isPlaying && currentAudioUri === note.audio_url}
                onPlay={() => playAudio(note.audio_url)}
                onDelete={() => deleteNote(note.id)}
                onUpdateTitle={(newTitle) => updateNoteTitle(note.id, newTitle)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

export default AudioRecorderStorage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  recordButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  recordingButton: {
    backgroundColor: '#f44336',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  notesList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  playButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  titleInput: {
    fontSize: 16,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    padding: 10,
  },
});