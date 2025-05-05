const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({path:'../.env'});


const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANONKEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

module.exports = supabase;