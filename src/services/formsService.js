import { supabase } from '../config/supabase'

const isSupabaseConfigured = !!(import.meta?.env?.VITE_SUPABASE_URL && import.meta?.env?.VITE_SUPABASE_ANON_KEY)
const shouldMock = (import.meta?.env?.VITE_FORMS_MOCK === 'true') || !isSupabaseConfigured
const useRest = import.meta?.env?.VITE_FORMS_USE_REST === 'true'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const submitContact = async ({ name, email, subject, message }) => {
  // Diagnostics: detect path
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (useRest) {
    if (!supabaseUrl || !anonKey) {
      console.warn('[formsService] VITE_FORMS_USE_REST=true but Supabase URL/key are missing')
      throw new Error('Missing Supabase REST env (URL/key).')
    }
    console.info('[formsService] Submitting contact via REST')
  } else if (supabase) {
    console.info('[formsService] Submitting contact via Supabase SDK')
  } else if (shouldMock) {
    console.warn('[formsService] Forms are in mock mode. Set VITE_FORMS_MOCK=false and configure Supabase to submit to API.')
  }
  // REST path (optional) — honors provided referrer policy requirement
  if (useRest || (!supabase && isSupabaseConfigured)) {
    const endpoint = `${supabaseUrl}/rest/v1/contact_messages`
    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          Prefer: 'return=representation'
        },
        // Align with strict-origin-when-cross-origin per request
        referrerPolicy: 'strict-origin-when-cross-origin',
        mode: 'cors',
        body: JSON.stringify([{ name, email, subject, message }])
      })
      if (!resp.ok) {
        const errText = await resp.text().catch(() => '')
        console.warn('submitContact REST failed:', resp.status, errText)
        if (shouldMock) {
          await delay(300)
          return { id: 'mock-contact', name, email, subject, message }
        }
        throw new Error(errText || `REST error ${resp.status}`)
      }
      const data = await resp.json().catch(() => [])
      return data?.[0] ?? { success: true }
    } catch (err) {
      console.warn('submitContact REST network error:', err?.message)
      // Fallback to SDK if available
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('contact_messages')
            .insert([{ name, email, subject, message }])
          if (error) throw error
          return data?.[0] ?? { success: true }
        } catch (sdkErr) {
          console.warn('submitContact SDK fallback failed:', sdkErr?.message)
          if (shouldMock) {
            await delay(300)
            return { id: 'mock-contact', name, email, subject, message }
          }
          throw new Error('Failed to submit: check Supabase URL, key, table and CORS settings.')
        }
      }
      if (shouldMock) {
        await delay(300)
        return { id: 'mock-contact', name, email, subject, message }
      }
      throw new Error('Network error submitting contact form. Verify Supabase URL/DNS and CORS.')
    }
  }

  // SDK path (default)
  if (!supabase && shouldMock) {
    await delay(300)
    return { id: 'mock-contact', name, email, subject, message }
  }
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, subject, message }])
  if (error) {
    console.warn('submitContact failed, falling back to mock:', error.message)
    if (shouldMock) {
      await delay(300)
      return { id: 'mock-contact', name, email, subject, message }
    }
    throw error
  }
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
  if (error) {
    console.warn('submitMemberSupport failed, falling back to mock:', error.message)
    if (shouldMock) {
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
    throw error
  }
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
  if (error) {
    console.warn('submitNewsletter failed, falling back to mock:', error.message)
    if (shouldMock) {
      await delay(300)
      return { id: 'mock-newsletter', email }
    }
    throw error
  }
  return data?.[0] ?? { success: true }
}

export default {
  submitContact,
  submitMemberSupport,
  submitNewsletter
}


