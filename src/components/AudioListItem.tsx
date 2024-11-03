// components/AudioListItem.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AudioNote } from 'src/types';
import { color, size } from 'src/constants';

interface AudioListItemProps {
  note: AudioNote;
  isPlaying: boolean;
  onPlay: () => void;
  onDelete: () => void;
  onUpdateTitle: (newTitle: string) => void;
}

export const AudioListItem: React.FC<AudioListItemProps> = ({
  note,
  isPlaying,
  onPlay,
  onDelete,
  onUpdateTitle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);

  const handleSaveTitle = () => {
    onUpdateTitle(newTitle);
    setIsEditing(false);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.playButton}
        onPress={onPlay}
      >
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={24}
          color={color.black}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        {isEditing ? (
          <TextInput
            style={styles.titleInput}
            value={newTitle}
            onChangeText={setNewTitle}
            onBlur={handleSaveTitle}
            autoFocus
          />
        ) : (
          <Text
            style={styles.title}
            onPress={() => setIsEditing(true)}
          >
            {note.title}
          </Text>
        )}
        <Text style={styles.date}>
          {new Date(note.created_at).toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <MaterialIcons name="delete" size={24} color={color.white}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    recordButton: {
      backgroundColor: color.white,
      padding: 15,
      borderRadius: 25,
      alignItems: 'center',
      marginBottom: 10,
    },
    recordingButton: {
      backgroundColor: color.white,
    },
    saveButton: {
      backgroundColor: color.white,
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
      backgroundColor: color.grey,
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      width: size.width - 40,
    },
    playButton: {
      backgroundColor: color.white,
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
      color: color.white
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