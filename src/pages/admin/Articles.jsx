import { useState, useEffect } from 'react';
import ArticleList from '../../components/admin/ArticleList';
import ArticleEditor from '../../components/admin/ArticleEditor';
import { createArticle, updateArticle, deleteArticle, getArticles } from '../../examples/article-operations';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
      setError(null);
    } catch (err) {
      console.error('Failed to load articles:', err);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (articleData) => {
    try {
      setIsLoading(true);
      if (editingArticle) {
        // Update existing article
        await updateArticle(editingArticle.id, articleData);
      } else {
        // Create new article
        await createArticle(articleData);
      }

      // Refresh the articles list
      await loadArticles();
      
      setIsEditorOpen(false);
      setEditingArticle(null);
      setError(null);
    } catch (err) {
      console.error('Failed to save article:', err);
      setError('Failed to save article. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setIsEditorOpen(true);
  };

  const handleDelete = async (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        setIsLoading(true);
        await deleteArticle(articleId);
        await loadArticles();
        setError(null);
      } catch (err) {
        console.error('Failed to delete article:', err);
        setError('Failed to delete article. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isEditorOpen) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {editingArticle ? 'Edit Article' : 'New Article'}
          </h1>
          <button
            type="button"
            onClick={() => {
              setIsEditorOpen(false);
              setEditingArticle(null);
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <ArticleEditor
          article={editingArticle}
          onSave={handleSave}
          disabled={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Articles</h1>
        <button
          type="button"
          onClick={() => setIsEditorOpen(true)}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          New Article
        </button>
      </div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <ArticleList
          articles={articles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Articles;
