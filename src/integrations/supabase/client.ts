import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gchbbgytnotdvfvwikwx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjaGJiZ3l0bm90ZHZmdndpa3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NDU1MjksImV4cCI6MjA2ODMyMTUyOX0.MM_Tmi2YoFZdBx5gDLASjrq9bSRxI5aI6yLa_BvBtfI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);