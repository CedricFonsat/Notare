// components/AudioRecorder.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { uploadAudioToSupabase } from '../services/audioService';
import { useAudioRecorder } from 'src/hooks';
import { AudioNote } from 'src/types';

interface Props {
  userId: string;
  onRecordingComplete?: (note: AudioNote) => void;
}

const AudioRecorder: React.FC<Props> = ({ userId, onRecordingComplete }) => {
  const { isRecording, recordingUri, startRecording, stopRecording } = useAudioRecorder();
  const [title, setTitle] = useState('');

  const handleSaveRecording = async () => {
    if (!recordingUri) return;

    const defaultTitle = `Note vocale ${new Date().toLocaleString()}`;
    const audioNote = await uploadAudioToSupabase(
      recordingUri,
      title || defaultTitle,
      userId
    );

    if (audioNote && onRecordingComplete) {
      onRecordingComplete(audioNote);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recordingButton]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'Arrêter l\'enregistrement' : 'Démarrer l\'enregistrement'}
        </Text>
      </TouchableOpacity>

      {recordingUri && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecording}>
          <Text style={styles.buttonText}>Sauvegarder l'enregistrement</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AudioRecorder;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#f44336',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});