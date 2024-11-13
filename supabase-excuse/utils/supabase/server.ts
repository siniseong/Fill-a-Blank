// utils/supabase/server.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL; // 환경 변수에서 가져오기
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // 환경 변수에서 가져오기

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);