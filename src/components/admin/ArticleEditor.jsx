import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageUpload from './ImageUpload';

const ArticleEditor = ({ article, onSave }) => {
  const [formData, setFormData] = useState(article || {
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'DRAFT',
    category: 'NEWS',
    tags: [],
    seoTitle: '',
    seoDescription: '',
    image: '',
    date: new Date().toLocaleDateString('el-GR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="NEWS">News</option>
            <option value="OPINION">Opinion</option>
            <option value="RESEARCH">Research</option>
            <option value="INNOVATION">Innovation</option>
            <option value="COMPETITION">Competition</option>
            <option value="EVENT">Event</option>
            <option value="FEATURE">Feature</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags.join(', ')}
          onChange={handleTagsChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700">SEO Title</label>
        <input
          type="text"
          id="seoTitle"
          name="seoTitle"
          value={formData.seoTitle}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700">SEO Description</label>
        <textarea
          id="seoDescription"
          name="seoDescription"
          value={formData.seoDescription}
          onChange={handleChange}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Cover Image</label>
        {formData.image ? (
          <div className="mt-2 relative">
            <img
              src={formData.image}
              alt="Cover"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="mt-2">
            <ImageUpload
              onImageUploaded={(key) => setFormData(prev => ({ ...prev, image: key }))}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Article
        </button>
      </div>
    </form>
  );
};

ArticleEditor.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    content: PropTypes.string,
    excerpt: PropTypes.string,
    status: PropTypes.oneOf(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
    category: PropTypes.oneOf(['NEWS', 'OPINION', 'RESEARCH', 'INNOVATION', 'COMPETITION', 'EVENT', 'FEATURE']),
    tags: PropTypes.arrayOf(PropTypes.string),
    seoTitle: PropTypes.string,
    seoDescription: PropTypes.string
  }),
  onSave: PropTypes.func.isRequired
};

ArticleEditor.defaultProps = {
  article: null
};

export default ArticleEditor;
