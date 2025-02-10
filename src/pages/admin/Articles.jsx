import { useState, useEffect } from 'react';
import ArticleList from '../../components/admin/ArticleList';
import ArticleEditor from '../../components/admin/ArticleEditor';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    // Load articles from localStorage initially
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  }, []);

  const handleSave = (articleData) => {
    const now = new Date().toISOString();
    
    if (editingArticle) {
      // Update existing article
      const updatedArticles = articles.map(article =>
        article.id === editingArticle.id
          ? { ...articleData, id: article.id, updatedAt: now }
          : article
      );
      setArticles(updatedArticles);
    } else {
      // Create new article
      const newArticle = {
        ...articleData,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now
      };
      setArticles([...articles, newArticle]);
    }

    setIsEditorOpen(false);
    setEditingArticle(null);
    
    // Save to localStorage
    localStorage.setItem('articles', JSON.stringify(articles));
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setIsEditorOpen(true);
  };

  const handleDelete = (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updatedArticles = articles.filter(article => article.id !== articleId);
      setArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
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
        <ArticleEditor
          article={editingArticle}
          onSave={handleSave}
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
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          New Article
        </button>
      </div>
      <ArticleList
        articles={articles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Articles;
