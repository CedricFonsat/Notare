// services/audioService.ts
import * as FileSystem from 'expo-file-system';
import { supabase } from 'src/supabase'
import { AudioNote } from 'src/types';
import { decode } from 'base64-arraybuffer';

export const uploadAudioToSupabase = async (
  uri: string,
  title: string,
  userId: string
): Promise<AudioNote | null> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileName = `${userId}/${Date.now()}.m4a`;
    const filePath = `audio/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('audio-notes')
      .upload(filePath, decode(base64), {
        contentType: 'audio/m4a',
      });

    if (uploadError) throw uploadError;

    const { data: audioNote, error: insertError } = await supabase
      .from('audio_notes')
      .insert({
        title,
        audio_url: filePath,
        user_id: userId,
      })
      .single();

    if (insertError) throw insertError;

    return audioNote;
  } catch (error) {
    console.error('Error uploading audio:', error);
    return null;
  }
};