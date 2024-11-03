// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://widiixmifhkesecquzcv.supabase.co'; // Remplacez par votre URL Supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpZGlpeG1pZmhrZXNlY3F1emN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMzQ2NTcsImV4cCI6MjA0NTkxMDY1N30.ITGVgu6G4FWcGxn6h9-IXQjFwVOU-kSvkU9BJcCT7eM'; // Remplacez par votre clé Anon

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
