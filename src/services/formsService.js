import { supabase } from '../config/supabase'

const shouldMock = import.meta?.env?.VITE_FORMS_MOCK === 'true'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const submitContact = async ({ name, email, subject, message }) => {
  if (!supabase && shouldMock) {
    await delay(300)
    return { id: 'mock-contact', name, email, subject, message }
  }
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, subject, message }])
  if (error) throw error
  return data?.[0] ?? { success: true }
}

export const submitMemberSupport = async ({
  category,
  commercialAssociation,
  email,
  fullName,
  phone,
  question
}) => {
  if (!supabase && shouldMock) {
    await delay(300)
    return {
      id: 'mock-member-support',
      category,
      commercial_association: commercialAssociation,
      email,
      full_name: fullName,
      phone,
      question
    }
  }
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
  if (error) throw error
  return data?.[0] ?? { success: true }
}

export const submitNewsletter = async ({ email }) => {
  if (!supabase && shouldMock) {
    await delay(300)
    return { id: 'mock-newsletter', email }
  }
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])
  if (error) throw error
  return data?.[0] ?? { success: true }
}

export default {
  submitContact,
  submitMemberSupport,
  submitNewsletter
}


