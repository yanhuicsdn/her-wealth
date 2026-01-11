import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

/**
 * 创建客户端 Supabase 客户端
 * 用于在浏览器组件中使用
 */
export const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

/**
 * 导出单例客户端
 */
export const supabase = createSupabaseClient()
