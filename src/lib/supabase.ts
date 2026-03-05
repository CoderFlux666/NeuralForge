import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qnkvvrjnunubsqvhurcp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFua3Z2cmpudW51YnNxdmh1cmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MjQxODgsImV4cCI6MjA4ODIwMDE4OH0.TATgr4Ij0U1bNxelPdq27T4YyeZL5FAk5W0civNhpQQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
