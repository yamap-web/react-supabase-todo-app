import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bejcujkzypljtonizcgz.supabase.co'!;
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlamN1amt6eXBsanRvbml6Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0NTYzMjEsImV4cCI6MjAyMDAzMjMyMX0.rEc2LlsCJYdeDaeK_4ikippMcnJBCK3EZEmdEnKzxrc'!;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
