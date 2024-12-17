import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://reiydtubwmrfeqvkkard.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaXlkdHVid21yZmVxdmtrYXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NDIzMDMsImV4cCI6MjA1MDAxODMwM30.vPgGfWyFyThiGXp34WI9wLJYAusNNeDGc0nKSpRdWnM'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase