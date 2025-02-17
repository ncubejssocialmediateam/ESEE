import { saveToTable, updateInTable, deleteFromTable, getFromTable } from '../utils/db-operations.js';

// Create a new article
export const createArticle = async (articleData) => {
  try {
    const article = await saveToTable('articles', {
      title: articleData.title,
      slug: articleData.slug,
      content: articleData.content,
      excerpt: articleData.excerpt,
      status: articleData.status,
      category: articleData.category,
      tags: articleData.tags,
      seo_title: articleData.seoTitle,
      seo_description: articleData.seoDescription,
      image_url: articleData.image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: articleData.status === 'PUBLISHED' ? new Date().toISOString() : null
    });
    console.log('Article created:', article);
    return article;
  } catch (error) {
    console.error('Failed to create article:', error);
    throw error;
  }
};

// Update an existing article
export const updateArticle = async (id, articleData) => {
  try {
    const updateData = {
      title: articleData.title,
      slug: articleData.slug,
      content: articleData.content,
      excerpt: articleData.excerpt,
      status: articleData.status,
      category: articleData.category,
      tags: articleData.tags,
      seo_title: articleData.seoTitle,
      seo_description: articleData.seoDescription,
      image_url: articleData.image,
      updated_at: new Date().toISOString()
    };

    // Only update published_at if status is changing to PUBLISHED
    if (articleData.status === 'PUBLISHED') {
      const currentArticle = await getFromTable('articles', id);
      if (currentArticle.status !== 'PUBLISHED') {
        updateData.published_at = new Date().toISOString();
      }
    }

    const article = await updateInTable('articles', id, updateData);
    console.log('Article updated:', article);
    return article;
  } catch (error) {
    console.error('Failed to update article:', error);
    throw error;
  }
};

// Delete an article
export const deleteArticle = async (id) => {
  try {
    await deleteFromTable('articles', id);
    console.log('Article deleted:', id);
  } catch (error) {
    console.error('Failed to delete article:', error);
    throw error;
  }
};

// Get a single article by ID
export const getArticle = async (id) => {
  try {
    const article = await getFromTable('articles', id);
    return article;
  } catch (error) {
    console.error('Failed to get article:', error);
    throw error;
  }
};

// Get a single article by slug
export const getArticleBySlug = async (slug) => {
  try {
    const result = await getFromTable('articles', null, {
      condition: 'slug = $1',
      values: [slug]
    });
    return result[0];
  } catch (error) {
    console.error('Failed to get article by slug:', error);
    throw error;
  }
};

// Get all articles with optional filters
export const getArticles = async (filters = {}) => {
  try {
    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (filters.status) {
      conditions.push(`status = $${paramCount}`);
      values.push(filters.status);
      paramCount++;
    }

    if (filters.category) {
      conditions.push(`category = $${paramCount}`);
      values.push(filters.category);
      paramCount++;
    }

    if (filters.tag) {
      conditions.push(`$${paramCount} = ANY(tags)`);
      values.push(filters.tag);
      paramCount++;
    }

    const options = {
      condition: conditions.length ? conditions.join(' AND ') : null,
      values: values.length ? values : null,
      orderBy: 'updated_at DESC'
    };

    if (filters.limit) {
      options.limit = filters.limit;
    }

    console.log('Fetching articles with options:', options);
    const result = await getFromTable('articles', null, options);
    console.log('Fetched articles:', result);
    return result;
  } catch (error) {
    console.error('Failed to get articles:', error);
    throw new Error(`Failed to fetch articles: ${error.message}`);
  }
};
