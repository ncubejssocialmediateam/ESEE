import { supabase } from '../config/supabase'

export const fetchArticles = async (filters = {}) => {
  try {
    let query = supabase.from('articles').select('*')

    if (filters.status) query = query.eq('status', filters.status)
    if (filters.category) query = query.eq('category', filters.category)
    if (filters.tag) query = query.contains('tags', [filters.tag])
    if (filters.limit) query = query.limit(filters.limit)

    const { data, error } = await query

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching articles:', error)
    throw new Error('Failed to fetch articles. Please try again later.')
  }
}

export const createArticle = async (articleData) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating article:', error)
    throw new Error('Failed to create article. Please try again later.')
  }
}

export const updateArticle = async (id, articleData) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .update(articleData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating article:', error)
    throw new Error('Failed to update article. Please try again later.')
  }
}

export const deleteArticle = async (id) => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error deleting article:', error)
    throw new Error('Failed to delete article. Please try again later.')
  }
}

export const getArticle = async (id) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching article:', error)
    throw new Error('Failed to fetch article. Please try again later.')
  }
}
