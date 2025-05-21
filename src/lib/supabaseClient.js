import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://odzwaebojotiencwncgs.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kendhZWJvam90aWVuY3duY2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODA1NTIsImV4cCI6MjA2MzM1NjU1Mn0.JzU2NSpaadXHh54pHo0LJATCK50_a0mvzw1O7EiRLoU';

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);