import { saveToTable, updateInTable, deleteFromTable, getFromTable } from '../utils/db-operations.js';

// Example of saving a new article
export const createArticle = async (articleData) => {
  try {
    const article = await saveToTable('articles', {
      title: articleData.title,
      content: articleData.content,
      author: articleData.author,
      created_at: new Date().toISOString()
    });
    console.log('Article created:', article);
    return article;
  } catch (error) {
    console.error('Failed to create article:', error);
    throw error;
  }
};

// Example of updating an article
export const updateArticle = async (id, articleData) => {
  try {
    const article = await updateInTable('articles', id, {
      title: articleData.title,
      content: articleData.content,
      updated_at: new Date().toISOString()
    });
    console.log('Article updated:', article);
    return article;
  } catch (error) {
    console.error('Failed to update article:', error);
    throw error;
  }
};

// Example of deleting an article
export const deleteArticle = async (id) => {
  try {
    const article = await deleteFromTable('articles', id);
    console.log('Article deleted:', article);
    return article;
  } catch (error) {
    console.error('Failed to delete article:', error);
    throw error;
  }
};

// Example of fetching articles
export const getArticles = async (conditions = {}) => {
  try {
    const articles = await getFromTable('articles', conditions);
    console.log('Articles fetched:', articles);
    return articles;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

// Example usage:
/*
// Create a new article
const newArticle = await createArticle({
  title: 'My First Article',
  content: 'This is the content of my first article',
  author: 'John Doe'
});

// Update the article
await updateArticle(newArticle.id, {
  title: 'Updated Title',
  content: 'Updated content'
});

// Get all articles by an author
const authorArticles = await getArticles({ author: 'John Doe' });

// Delete an article
await deleteArticle(newArticle.id);
*/
