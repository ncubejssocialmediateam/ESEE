import { supabase } from '../config/supabase'

export const submitContact = async ({ name, email, subject, message }) => {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, subject, message }])
    .select()
    .single()
  if (error) throw error
  return data
}

export const submitMemberSupport = async ({
  category,
  commercialAssociation,
  email,
  fullName,
  phone,
  question
}) => {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('member_support_requests')
    .insert([
      {
        category,
        commercial_association: commercialAssociation,
        email,
        full_name: fullName,
        phone,
        question
      }
    ])
    .select()
    .single()
  if (error) throw error
  return data
}

export const submitNewsletter = async ({ email }) => {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])
    .select()
    .single()
  if (error) throw error
  return data
}

export default {
  submitContact,
  submitMemberSupport,
  submitNewsletter
}


