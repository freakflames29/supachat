import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://gxbjnajtrcjjkqfrupyb.supabase.co'

const SUPA_URL = 'https://gxbjnajtrcjjkqfrupyb.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YmpuYWp0cmNqamtxZnJ1cHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTY0MjYsImV4cCI6MjA2NzczMjQyNn0.GYqxalOMfNNbV1BF7qBGsWw3g-UmBu03Q0le0-7YlJY';
const supabaseUrl = SUPA_URL;
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
