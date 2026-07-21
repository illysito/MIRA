import { supabase } from '../../../services/supabase.js'

export async function saveResponse(userData) {
  const { error } = await supabase.from('responses').insert({
    email: userData.email,
    alignment: userData.alignment,
    date: userData.date,
    time: userData.time,
    reflection: userData.optionalReflection,
  })

  if (error) {
    console.error('Could not save response:', error)
    throw error
  }

  console.log('Response saved')
}
